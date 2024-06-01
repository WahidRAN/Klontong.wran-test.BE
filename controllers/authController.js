import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import "dotenv/config";

export const register = async (req, res) => {
	const { name, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await pool.query(
			"INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
			[name, hashedPassword]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const SECRET_KEY = process.env.SECRET_KEY;
export const login = async (req, res) => {
	const { name, password } = req.body;

	try {
		const result = await pool.query("SELECT * FROM users WHERE name = $1", [
			name,
		]);

		if (result.rows.length === 0) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const user = result.rows[0];
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
