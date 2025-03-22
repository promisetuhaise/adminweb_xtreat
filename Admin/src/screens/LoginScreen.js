import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text as RNText,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.28.234:8000/api/v1/adminweb/admin/login/"; // Replace with your actual API endpoint

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState("");

  // Check for an existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.navigate("AdminDashboard"); // Auto-login if token exists
        }
      } catch (error) {
        console.log("Error reading token:", error);
      }
    };
    checkSession();
  }, [navigation]);

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle login submission
  const handleLogin = async (values) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        // Ensure the token is prefixed with "Token "
        const tokenWithPrefix = data.token.startsWith("Token ")
          ? data.token
          : "Token " + data.token;
        console.log("Storing token:", tokenWithPrefix);

        // Save token and super admin flag in AsyncStorage
        await AsyncStorage.setItem("authToken", tokenWithPrefix);
        await AsyncStorage.setItem("isSuperAdmin", JSON.stringify(data.is_superadmin));
        setLoginError("");

        // Navigate to the admin dashboard
        navigation.navigate("AdminDashboard");
      } else {
        // Display error provided by the API, if any
        setLoginError(data.message || data.detail || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Login error:", error);
      setLoginError("Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Orange background to match dashboard colors */}
      <View style={styles.header}>
        <RNText style={styles.headerLeft}>XTREATIVE MARKET</RNText>
        <View style={styles.headerRight}>
          <Ionicons name="person-circle-outline" size={24} color="#000" />
          <RNText style={styles.headerWelcome}>Hi, Welcome Back</RNText>
        </View>
      </View>

      {/* Centered Sign-In Card */}
      <View style={styles.centerContent}>
        <View style={styles.card}>
          <Text style={styles.signInTitle}>Sign In</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* Email Field */}
                <TextInput
                  label="Email"
                  mode="outlined"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.input}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password Field */}
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Forgot Password Link */}
                <TouchableOpacity onPress={() => Alert.alert("Forgot Password?")}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.signInButton}
                >
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </Button>

                {/* Login Error Message */}
                {loginError ? (
                  <View style={styles.loginErrorContainer}>
                    <Text style={styles.loginErrorText}>{loginError}</Text>
                  </View>
                ) : null}
              </>
            )}
          </Formik>

          {/* Footer Logo */}
          <Image
            source={require("../../assets/logo.png")}
            style={styles.footerLogo}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#F9622C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    color: "#280300",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerWelcome: {
    marginLeft: 8,
    color: "#280300",
    fontSize: 14,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 450,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#280300",
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "#F9622C",
    fontSize: 12,
    marginBottom: 5,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#1976D2",
    marginBottom: 15,
    fontSize: 12,
  },
  signInButton: {
    backgroundColor: "#280300",
    paddingVertical: 8,
    marginTop: 10,
  },
  signInButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  loginErrorContainer: {
    backgroundColor: "#ffe6e6",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  loginErrorText: {
    color: "#d9534f",
    textAlign: "center",
  },
  footerLogo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
});
