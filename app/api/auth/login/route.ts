import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const session = await getSession();

    session.user = {
      id: user._id.toString(),
      email: user.email,
    };

    session.isLoggedIn = true;

    await session.save();

    return Response.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}