import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Question {
    _id: string;
    question: string;
    answers: { answer: string; key: string }[];
    correct: string;
}

interface ExamState {
    questions: Question[];
    answers: { [key: string]: string };
    loading: boolean;
    error: string | null;
}

const initialState: ExamState = {
    questions: [],
    answers: {},
    loading: false,
    error: null,
};

export const fetchQuestions = createAsyncThunk(
    'exam/fetchQuestions',
    async (examId: string, { rejectWithValue }) => {
        const token = localStorage.getItem("token") ?? "";
        try {
            const response = await axios.get(
                `${process.env.API_URL}/api/v1/questions?exam=${examId}`,
                {
                    headers: { token },
                }
            );
            return response.data.questions;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Error fetching questions");
        }
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            const { questionId, answerKey } = action.payload;
            state.answers[questionId] = answerKey;
        },
        resetExam: (state) => {
            state.questions = [];
            state.answers = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setAnswer, resetExam } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer