import { AccidentObserverRepository } from "./accidentObserve";
import { ChatRepository } from "./chat";
import { UserRepository } from "./users";

export const userRepository = new UserRepository();
export const accidentObserverRepository = new AccidentObserverRepository();
export const chatRepository = new ChatRepository();
