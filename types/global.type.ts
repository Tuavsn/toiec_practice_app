export interface BaseObject {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Role extends BaseObject {
    name: string;
    description: string;
}

export interface User extends BaseObject {
    email?: string;
    avatar?: string;
    role?: string;
    token?: string;
}

export interface Lecture extends BaseObject {
    name: string;
    content: string;
    topic: Topic[];
    practiceQuestions: Question[];
}

export interface Lecture {
    title: string;
    content: string;
    description: string;
}

export interface Assignment {
    require: number;
    totalQuestion: number;
    questionIds: string[];
}

export interface Category extends BaseObject {
    format: string;
    year: number;
    tests: Test[];
}

export interface Topic extends BaseObject {
    name: string;
	solution: string;
	overallSkill: string;
}

export interface Test extends BaseObject {
    name: string;
    totalUserAttemp: number;
    totalQuestion: number;
    totalScore: number;
    limitTime: number;
    questions: Question[];
    category: Category;
}

export interface Question extends BaseObject {
    questionNum: number;
    partNum: number;
    type: QuestionType;
    subQuestions: Question[];
    content: string;
    difficulty: Difficulty;
    topic: Topic[];
    resources: Resource[];
    transcript: string;
    explanation: string;
    answers: string[];
    correctAnswer: string;
}

export interface AnswerPair extends BaseObject {
    questionId: string;
    userAnswer: string;
    timeSpent: number;
}

export interface SubmitRequest extends BaseObject {
    userAnswer: AnswerPair[] | AnswerPair;
	totalSeconds: number;
	testId: string;
	parts: string;
	type: string;
}

export interface Result extends BaseObject {
    testId: string;
    totalTime: number;
    totalReadingScore: number;
    totalListeningScore: number;
    totalCorrectAnswer: number;
    totalIncorrectAnswer: number;
    totalSkipAnswer: number;
    type: string;  // practice or fulltest
    parts: string;  // Practice parts
    userAnswers: UserAnswer[];
}

export interface UserAnswer extends BaseObject {
    questionId: string;
    listTopics: Topic[];
    userAnswer: string;
    solution: string;
    correct: boolean;
    timeSpent: number;
    questionNum: number;
    partNum: number;
    type: QuestionType;
    subUserAnswer: UserAnswer[];
    content: string;
    difficulty: Difficulty;
    resources: Resource[];
    transcript: string;
    explanation: string;
    answers: string[];
    correctAnswer: string;
}

export interface Resource {
    type: ResourceType;
    content: string;
}

export interface BannerDataTypes {
    bannerImageUrl: any;
}

// ENUM

export enum Difficulty {
    EASY = 0,
    MEDIUM = 1,
    HARD = 2
}

export enum QuestionType {
    SINGLE = "single",
    GROUP = "group",
    SUBQUESTION = "subquestion"
}

export enum ResourceType {
    PARAGRAPH = "paragraph",
    IMAGE = "image",
    AUDIO = "audio"
}

export enum PracticeType {
    LISTENING = "listening",
    READING = "reading",
    VOCABULRARY = "vocabulary",
    GRAMMAR = "grammar"
}