import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Exam {
    _id: string;
    title: string;
    duration: number;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string;
}

interface ExamsState {
    loading: boolean;
    error: string | null;
    exams: Exam[];
}

const initialState: ExamsState = {
    loading: false,
    error: null,
    exams: [],
};

export const fetchExams = createAsyncThunk(
    'exams/fetchExams',
    async ({ subjectId }: { subjectId: string; token: string }) => {
        const response = await axios.get(
            `https://exam.elevateegy.com/api/v1/exams?subject=${subjectId}`,
            {
                headers: {
                    token: localStorage.getItem("token") ?? ""
                },
            }
        );
        return response.data.exams;
    }
);

const examsSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching exams';
            });
    },
});

export const examsReducer = examsSlice.reducer
