import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Answer {
    answer: string;
    key: string;
}

interface Question {
    answers: Answer[];
    type: string;
    _id: string;
    question: string;
    correct: string;
    subject: string;
    exam: string;
    createdAt: string;
}

interface HistoryItem {
    _id: string;
    checkAnswer: string;
    QID: Question;
    user: string;
    chosenAnswer: string;
    avgAnswerTime: string;
    createdAt: string;
}

interface HistoryState {
    history: HistoryItem | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: HistoryState = {
    history: null,
    status: 'idle',
    error: null
};

export const fetchQuizHistory = createAsyncThunk(
    'history/fetchQuizHistory',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://exam.elevateegy.com/api/v1/questions/history',
                {
                    headers: { token }
                }
            );
            return response.data.history;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
        }
    }
);

const quizHistorySlice = createSlice({
    name: 'quizHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizHistory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchQuizHistory.fulfilled, (state, action: PayloadAction<HistoryItem>) => {
                state.status = 'idle';
                state.history = action.payload;
                state.error = null;
            })
            .addCase(fetchQuizHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default quizHistorySlice.reducer;