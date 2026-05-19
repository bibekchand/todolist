import { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import useUser from "../hooks/useUser.jsx";
import HeroImage from "../assests/HeroImageLogin.svg?react";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Typography,
} from "@heroui/react";
export default function Login() {
    const [, , , , login] = useUser();
    function onSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className="w-full justify-center grid grid-cols-2 h-screen">
            <div className="h-full">
                <HeroImage />
            </div>
            <div className=" flex flex-col justify-center items-start relative">
                <Typography.Heading level={1} className="absolute top-40">
                    {" "}
                    Welcome back, <br /> Login here
                </Typography.Heading>
                <Form className="flex flex-col gap-4 " onSubmit={onSubmit}>
                    <TextField isRequired name="username">
                        <Label>Username</Label>
                        <Input placeholder="ramshah" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button type="submit">Login</Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
