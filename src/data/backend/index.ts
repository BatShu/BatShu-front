import { AccidentObserverRepository } from "./accidentObserve";
import { UserRepository } from "./users";

export const userRepository = new UserRepository();
export const accidentObserverRepository = new AccidentObserverRepository();
