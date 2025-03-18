import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token.");
    }
  }, [token]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    const isValid = minLength && hasSpecialChar && hasUppercase && hasNumber;
    setPasswordValid(isValid);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage(response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage(error.response?.data || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(newPassword === e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
    setPasswordMatch(confirmPassword === value);
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handlePasswordReset}>
          <h2>Reset Password</h2>

          {isLoading && <LoadingText>Processing your request...</LoadingText>}

          {!isLoading && !token && <MessageText error>Invalid or missing token. Please check your reset link.</MessageText>}

          {!isLoading && token && !isSuccess && (
            <>
              <Label>
                New Password:
                <PasswordInput>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </PasswordInput>
                <PasswordValidation>
                  <ValidationText valid={passwordValid}>
                    {passwordValid
                      ? "✔️ Password is valid"
                      : "❌ Password must contain at least 8 characters, an uppercase letter, a number, and a special character."}
                  </ValidationText>
                </PasswordValidation>
              </Label>

              <Label>
                Confirm Password:
                <PasswordInput>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </PasswordInput>
                <PasswordValidation>
                  <ValidationText valid={passwordMatch}>
                    {passwordMatch ? "✔️ Passwords match" : "❌ Passwords do not match"}
                  </ValidationText>
                </PasswordValidation>
              </Label>

              <SubmitButton type="submit" disabled={!passwordValid || !passwordMatch}>
                Reset Password
              </SubmitButton>
            </>
          )}

          {isSuccess && (
            <SuccessMessage>
              Password has been reset successfully!
              <Button onClick={handleGoToLogin}>Go to Login Page</Button>
            </SuccessMessage>
          )}

          {message && <MessageText error>{message}</MessageText>}
        </Form>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #34495e;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

const Label = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const PasswordInput = styled.div`
  position: relative;
  input {
    padding: 10px;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #34495e;
    color: white;
  }
  span {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
  }
`;

const PasswordValidation = styled.div`
  margin-top: 5px;
`;

const ValidationText = styled.p`
  font-weight: bold;
  color: ${(props) => (props.valid ? "green" : "red")};
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  &:disabled {
    background-color: #7f8c8d;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  color: white;
`;

const MessageText = styled.p`
  color: ${(props) => (props.error ? "red" : "green")};
  text-align: center;
  font-weight: bold;
`;

const SuccessMessage = styled.div`
  color: green;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

export default ResetPassword;
