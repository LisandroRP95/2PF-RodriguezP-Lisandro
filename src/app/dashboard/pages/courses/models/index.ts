export interface Course {
    id: number;
    name: string;
    description: string;
    courseCode: number;
}

export interface CreateCourseData {
    name: string;
    description: string;
    courseCode: number;
}

export interface UpdateCourseData {
    name?: string;
    description?: string;
    courseCode?: number;
}