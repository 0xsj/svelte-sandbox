export interface User {
	id: string;
	email: string;
	name: string;
	role: 'admin' | 'user';
	createdAt: string;
}

export interface CreateUserInput {
	email: string;
	name: string;
	role?: 'admin' | 'user';
}

export interface UpdateUserInput {
	name?: string;
	role?: 'admin' | 'user';
}
