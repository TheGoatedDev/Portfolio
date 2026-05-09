export type ContactState =
	| { status: "idle" }
	| { status: "success"; message: string }
	| {
			status: "error";
			error: string;
			values?: { name: string; email: string; message: string };
	  };

export const initialContactState: ContactState = { status: "idle" };
