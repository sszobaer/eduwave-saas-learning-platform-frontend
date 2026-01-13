export interface User {
    user_id: number;
    full_name: string;
    profile_img?: string | null;
    isActive: boolean
    role: {
        role_id: number;
        role_name: string;
    };

    credential: {
        email: string;
    };
}
