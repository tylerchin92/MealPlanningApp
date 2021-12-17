import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav, NavDropdown} from 'react-bootstrap';

function MealPlannerNavbar() {

    return (
        <Navbar bg="dark" expand="lg" fixed="top" variant='dark'>
            <Container>
                <Navbar.Brand>Meal Planning Machine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/ViewUsers">Users</Nav.Link>
                        <Nav.Link href="/ViewRecipes">Recipes</Nav.Link>
                        <Nav.Link href="/ViewMealPlans">Meal Plans</Nav.Link>
                        <Nav.Link href="/ViewMealTypes">Meal Types</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MealPlannerNavbar