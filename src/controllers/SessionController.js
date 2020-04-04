import User from  '../models/User';

class SessionController {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({email});

        if (!user) {
           user = await User.create({ email });
        } else {
            return res.json({ message: `Usuário ${user.email} já existe em nossa base de dados`});
        }

        return res.json({ message: `Usuário ${user.email} criado com sucesso`});
    }
}

export default new SessionController();