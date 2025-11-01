// backend/src/controllers/userController.js
import User from '../models/User.js';

export const getMe = async (req, res) => {
    return res.json({ user: req.user });
};

export const updateMe = async (req, res) => {
    try {
    const { name, email, password } = req.body || {};
    const user = await User.findById(req.user._id).select('+password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password && password.length >= 6) user.password = password; // se hashea en pre-save

    await user.save();
    const safe = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.json({ msg: 'Perfil actualizado', user: safe });
    } catch (err) {
    res.status(500).json({ msg: 'Error actualizando perfil', error: err.message });
    }
};
