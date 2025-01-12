import { configureStore } from "@reduxjs/toolkit";
import { registerReducer } from "./Authentication/registerSlice";
import { authReducer } from "./Authentication/authSlice";
import subjectsReducer from "./Subjects/subjectsSlice";
import { examsReducer } from "./Exams/examsSlice";
import questionsReducer from './Questions/questionsSlice';

export const store = configureStore({
    reducer: {
        registerReducer,
        authReducer,
        subjects: subjectsReducer,
        exams: examsReducer,
        questions: questionsReducer,
    }
});

export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>;