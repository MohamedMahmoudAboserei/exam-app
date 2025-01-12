import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Answer {
    answer: string;
    key: string;
}


export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
    correct: string;
}

export interface QuestionsState {
    questions: Question[];
    userAnswers: Record<string, string>;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

export interface FetchQuestionsParams {
    examId: string;
    token: string;
}

export const initialState: QuestionsState = {
    questions: [],
    userAnswers: {},
    status: 'idle',
    error: null
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async ({ examId, token }: FetchQuestionsParams) => {
        try {
            const response = await axios.get(
                `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
                {
                    headers: {
                        token: token,
                    },
                }
            );
            return response.data.questions;
        } catch (error) {
            throw new Error('Failed to fetch questions');
        }
    }
);

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
            state.userAnswers[action.payload.questionId] = action.payload.answer;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
                state.status = 'idle';
                state.questions = action.payload;
                state.error = null;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch questions';
            });
    },
});

export const { answerQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;