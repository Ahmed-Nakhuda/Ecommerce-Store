import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import cities from "cities.json";
import Select from "react-select";
import "./style-sheets/checkout.css";


function Checkout() {
    const [canadianCities, setCanadianCities] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [expirationDate, setExpirationDate] = useState(null);
    const [securityCode, setSecurityCode] = useState("");

    const [buttonHidden, setButtonHidden] = useState(false);
    const [continueButtonEnabled, setContinueButtonEnabled] = useState(false);
    const [placeOrderButtonEnabled, setPlaceOrderButtonEnabled] = useState(false);
    const [paymentAccordionDisabled, setPaymentAccordionDisabled] = useState(false);
    const [paymentAccordionExpanded, setPaymentAccordionExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Enable next button if all shipping info fields are filled
    useEffect(() => {
        setContinueButtonEnabled(
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            phone !== "" &&
            address !== "" &&
            city !== "" &&
            province !== ""
        );
    }, [firstName, lastName, email, phone, address, city, province]);

    // Enable place order button if all fields are filled
    useEffect(() => {
        setPlaceOrderButtonEnabled(
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            phone !== "" &&
            address !== "" &&
            city !== "" &&
            province !== "" &&
            cardNumber !== "" &&
            nameOnCard !== "" &&
            expirationDate !== null &&
            securityCode !== ""
        );
    }, [
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        province,
        cardNumber,
        nameOnCard,
        expirationDate,
        securityCode,
    ]);

    useEffect(() => {
        // Filter out cities from Canada
        const filteredCities = cities.filter((city) => city.country === "CA");
        // Transform city data into format expected by react-select
        const cityOptions = filteredCities.map((city) => ({
            value: city.name,
            label: city.name,
        }));
        setCanadianCities(cityOptions);
    }, []);

    // Provinces / Territories
    const provinces = [
        { value: "Alberta", label: "Alberta" },
        { value: "British Columbia", label: "British Columbia" },
        { value: "Manitoba", label: "Manitoba" },
        { value: "New Brunswick", label: "New Brunswick" },
        { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" },
        { value: "Northwest Territories", label: "Northwest Territories" },
        { value: "Nova Scotia", label: "Nova Scotia" },
        { value: "Nunavut", label: "Nunavut" },
        { value: "Ontario", label: "Ontario" },
        { value: "Prince Edward Island", label: "Prince Edward Island" },
        { value: "Quebec", label: "Quebec" },
        { value: "Saskatchewan", label: "Saskatchewan" },
        { value: "Yukon", label: "Yukon" },
    ];


    const handleClick = () => {
        setButtonHidden(true);
    };


    const handleNextButtonClick = () => {
        setPaymentAccordionDisabled(true);
        setPaymentAccordionExpanded(true);
    };


    const navigate = useNavigate();

    const handlePlaceOrderButtonClick = () => {
        if (!placeOrderButtonEnabled) {
            setErrorMessage("All fields must be filled out");
        } else {
            setErrorMessage("");
            navigate("/confirmation");
        }
    };

    return (
        <div className="accordion">
            <Accordion defaultExpanded>
                <AccordionSummary
                    sx={{
                        backgroundColor: "black",
                    }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography color={"white"} variant="h5" className="accordionHeading">
                        Shipping Details
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form id="checkoutForm" className="form">
                        <div className="formGroup">
                            <label id="firstName" htmlFor="firstName">
                                First Name:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label id="lastName" htmlFor="lastName">
                                Last Name:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label id="email" htmlFor="email">
                                Email:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label className="checkoutFormLabel" htmlFor="phone">
                                Phone Number:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="phone"
                                type="text"
                                placeholder="123-456-7890"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label id="address" htmlFor="address">
                                Address:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <div className="selectContainer">
                                <label id="city" htmlFor="city">
                                    City:
                                </label>
                                <Select
                                    styles={reactSelectStyles}
                                    options={canadianCities}
                                    onChange={(selectedOption) => setCity(selectedOption.value)}
                                />
                            </div>
                        </div>
                        <div className="formGroup">
                            <div className="selectContainer">
                                <label id="province" htmlFor="address">
                                    Province:
                                </label>
                                <Select
                                    styles={reactSelectStyles}
                                    options={provinces}
                                    onChange={(selectedOption) => setProvince(selectedOption.value)}
                                />
                            </div>
                        </div>
                        {!buttonHidden && (
                            <>
                                <button
                                    type="button"
                                    id="continueButton"
                                    onClick={() => {
                                        if (!continueButtonEnabled) {
                                            setErrorMessage("All fields must be filled out");
                                        } else {
                                            setErrorMessage("");
                                            handleNextButtonClick();
                                            handleClick();

                                        }
                                    }}
                                >
                                    Continue to Payment
                                </button>
                                <p id="errorMessage">{errorMessage}</p>
                            </>
                        )}
                    </form>
                </AccordionDetails>
            </Accordion>


            <Accordion expanded={paymentAccordionExpanded} disabled={!paymentAccordionDisabled}>
                <AccordionSummary
                    sx={{
                        backgroundColor: "black",
                    }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography color={"white"} variant="h5">
                        Payment
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form id="checkoutForm" className="form">
                        <div className="formGroup">
                            <label id="cardNumber" htmlFor="cardNumber">
                                Card Number:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="cardNumber"
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label id="nameOnCard" htmlFor="nameOnCard">
                                Name on Card:
                            </label>
                            <TextField
                                className="textbox"
                                variant="outlined"
                                name="nameOnCard"
                                onChange={(e) => setNameOnCard(e.target.value)}
                            />
                        </div>
                        <div className="formGroup">
                            <label id="expirationDate" htmlFor="expirationDate">
                                Expiration Date:
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="datePicker"
                                    views={["month", "year"]}
                                    onChange={(date) => setExpirationDate(date)}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="formGroup">
                            <label id="securityCode" htmlFor="nameOnCard">
                                Security Code:
                            </label>
                            <TextField
                                className="securityCodeTextbox"
                                variant="outlined"
                                name="securityCode"
                                type="number"
                                placeholder="123"
                                onChange={(e) => setSecurityCode(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handlePlaceOrderButtonClick}
                            type="button"
                            id="placeOrderButton"
                        >
                            Place Order
                        </button>
                        <p id="placeOrderErrorMessage">{errorMessage}</p>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

// Style for react-select dropdown
const reactSelectStyles = {
    control: (provided) => ({
        ...provided,
        width: "100%",
        marginLeft: "75px",
        '@media (max-width: 1000px)': {
            marginLeft: "5px",
        },
    }),
    menu: (provided) => ({
        ...provided,
        width: "100%",
        marginLeft: "75px",
        '@media (max-width: 1000px)': {
            marginLeft: "5px",
        },
    }),
};

export default Checkout;
