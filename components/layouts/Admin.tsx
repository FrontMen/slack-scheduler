import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { useAuthUser, useDataContext } from '@context/.';
import { FullpageLoader, Error } from '@components/.';
import { AccountCircle } from '@material-ui/icons';

type Props = {};

const useStyles = makeStyles({
  spacer: { flexGrow: 1 },
});

const AdminLayout: FC<Props> = ({ children }) => {
  const { signOut, isLoggedIn, isLoading: isUserLoading, user, isAdmin } = useAuthUser();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const { isLoading, error } = useDataContext();

  useEffect(() => {
    if (!isUserLoading && !isLoggedIn) {
      router.push('/login');
    }
    if (isLoggedIn && !isAdmin) {
      router.push('/login');
    }
  }, [isUserLoading, isLoggedIn, router, isAdmin]);

  const handleSignOff = () => {
    setisMenuOpen(false);
    signOut();
  };

  if (isUserLoading || !isLoggedIn) return <FullpageLoader />;

  return (
    <>
      <header>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Link href='/'>
                <MenuItem>Birthdays</MenuItem>
              </Link>
              <Link href='/messages'>
                <MenuItem>Messages</MenuItem>
              </Link>

              <div className={classes.spacer}></div>

              {user && (
                <div>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={() => setisMenuOpen(true)}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={() => setisMenuOpen(false)}
                  >
                    <MenuItem onClick={handleSignOff}>Signoff</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <Container>
        <main>
          {error && <Error error={error} />}
          {isLoading ? (
            <Box p={2} display='flex' justifyContent='center'>
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </main>
      </Container>
      <footer></footer>
    </>
  );
};

export default AdminLayout;
