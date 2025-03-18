import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Dynamically set padding to body based on footer height
  useEffect(() => {
    const footerHeight = document.querySelector('footer').offsetHeight;
    document.body.style.paddingBottom = `${footerHeight}px`;
  }, []);

  const footerStyles = {
    backgroundColor: "#1f1f1f",
    color: "#bbb",
    padding: "20px 0", // Reduced padding to make the footer smaller
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    width: "100%", // Ensure the footer spans the entire width of the screen
    position: "fixed", // Fixed at the bottom
    bottom: "0", // Stuck at the bottom
    left: "0", // Align to the left
    zIndex: "10", // Ensure it's above other content
  };

  const footerContentStyles = {
    maxWidth: "920px", // Reduced max-width to make the footer content smaller
    margin: "0 auto", // Center the footer content within the footer
  };

  const footerLinksStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "10px", // Reduced space between links
    marginBottom: "10px", // Reduced space below links
    flexWrap: "wrap",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "#bbb",
    fontSize: "1rem", // Slightly smaller font size for a more compact look
    fontWeight: "bold",
    padding: "5px", // Reduced padding
    position: "relative", // To position the glow around the text
    transition: "color 0.3s ease, text-shadow 0.3s ease, transform 0.2s ease", // Smooth transitions
  };

  const footerSloganStyles = {
    fontSize: "1.1rem", // Reduced size for a more compact look
    color: "#ddd",
    marginBottom: "10px", // Reduced space below slogan
    fontWeight: "bold",
    fontStyle: "italic",
    padding: "5px 0", // Padding between lines
  };

  const socialMediaIconsStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "15px", // Reduced gap between icons
    marginTop: "10px", // Reduced space above icons
  };

  const iconStyles = {
    color: "#bbb",
    fontSize: "2rem", // Slightly smaller icon size
    transition: "color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease", // Added transition for hover effects
    padding: "8px", // Reduced padding
    position: "relative", // To position the neon glow around the icon
  };

  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        {/* Footer Links */}
        <div style={footerLinksStyles}>
          <Link
            to="/copyright"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Copyright
          </Link>
          <Link
            to="/contact"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Contact Us
          </Link>
          <Link
            to="/help"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Help
          </Link>
          <Link
            to="/service"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Service
          </Link>
          <Link
            to="/blog"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Blog
          </Link>
          <Link
            to="/employers"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Employers
          </Link>
          <Link
            to="/information"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Information
          </Link>
          <Link
            to="/terms"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.textShadow = "0 0 15px #32CD32, 0 0 30px #32CD32")}
            onMouseOut={(e) => (e.target.style.textShadow = "none")}
            onClick={(e) => e.target.classList.add("vibrate")}
            onAnimationEnd={(e) => e.target.classList.remove("vibrate")}
          >
            Terms of Use
          </Link>
        </div>

        {/* Footer Slogan */}
        <div style={footerSloganStyles}>
          <i>Stay connected with Linkify</i> {/* Italicized slogan */}
        </div>

        {/* Social Media Icons */}
        <div style={socialMediaIconsStyles}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={iconStyles}
            onMouseOver={(e) => (e.target.style.boxShadow = "0 0 25px 5px #00BFFF")}
            onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            onClick={(e) => e.target.style.boxShadow = "0 0 50px 10px #00BFFF"} // Neon blue glow on click
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            style={iconStyles}
            onMouseOver={(e) => (e.target.style.boxShadow = "0 0 25px 5px #00BFFF")}
            onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            onClick={(e) => e.target.style.boxShadow = "0 0 50px 10px #00BFFF"} // Neon blue glow on click
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            style={iconStyles}
            onMouseOver={(e) => (e.target.style.boxShadow = "0 0 25px 5px #00BFFF")}
            onMouseOut={(e) => (e.target.style.boxShadow = "none")}
            onClick={(e) => e.target.style.boxShadow = "0 0 50px 10px #00BFFF"} // Neon blue glow on click
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
