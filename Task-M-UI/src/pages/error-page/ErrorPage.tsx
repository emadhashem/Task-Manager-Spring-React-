import {Typography, Button} from '@mui/material';
import {styled} from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
});

const Title = styled(Typography)({
    marginBottom: '16px',
    fontWeight: 'bold',
});

const Message = styled(Typography)({
    marginBottom: '16px',
});

const ActionButton = styled(Button)({
    marginTop: '16px',
});

const ErrorPage = () => {
    return (
        <Container>
            <Title variant="h5">
                404 - Page Not Found
            </Title>
            <Message variant="body1">
                The page you are looking for does not exist.
            </Message>
            <ActionButton onClick={() => window.location.pathname = "/"} variant="contained" color="primary">
                Go to homepage
            </ActionButton>
        </Container>
    );
};

export default ErrorPage;
