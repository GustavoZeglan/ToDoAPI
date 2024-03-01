import { AppDataSource } from "../connection";
import { User } from "../entity/User";

export const getUserByEmail = async (email: string): Promise<User | void> => {
	
	try {
		
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOneBy({email: email});

		if (user != null) {
			return user;
		}

	} catch (err) {
		console.error("Erro ao executar consulta:",err);
	} 
} ;
