import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useApiRequests from "../services/useApiRequests";

const Login = () => {
  const { login } = useApiRequests();
  const loginSchema = object({
    password: string()
      .required("Şifre alanı zorunludur")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        "Şifre en az 1 harf ve 1 rakam içermelidir"
      )
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .max(16, "Şifre en fazla 16 karakter olmalıdır"),
    email: string().email("Lütfen geçerli bir e-posta adresi girin").required(),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              //? post (login)
              login(values);
              //? formu temizle
              //? mesaj (toast)
              //? routing (stock)
              //? global state güncellemesi
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              handleChange,
              values,
              touched,
              errors,
              handleBlur,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.password}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
