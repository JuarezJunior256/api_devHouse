import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    } else {
      return res.json({
        message: `Usuário ${user.email} já existe em nossa base de dados`,
      });
    }

    return res.json({ message: `Usuário ${user.email} criado com sucesso` });
  }
}

export default new SessionController();
