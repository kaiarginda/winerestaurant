"use client";

import Image from "next/image";
import "./pagescar.css";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    let counter1 = 0;
    let counter2 = 1;
    let bool = true;

    const sections = document.querySelectorAll("section");
    const progress = document.querySelector(".progress h2");
    const circles = document.querySelectorAll(".circle");
    const section1wrapper = document.querySelector(".section-1-wrapper");
    const section5wrapper = document.querySelector(".section-5-wrapper");

    section1wrapper.style.transform = "scale(1)";

    const progressCounter = () => {
      progress.textContent = `${counter2}/${sections.length}`;

      Array.from(circles).forEach((circle) => {
        circle.style.backgroundColor = "transparent";
      });
      document.querySelector(`.circle-${counter2}`).style.backgroundColor =
        "#ddd";
    };

    const pageController = () => {
      bool = true;
      if (counter1 === 5) {
        Array.from(sections).forEach((section) => {
          section.style.left = "0";
        });
        counter1 = 0;
        counter2 = 1;
        section1wrapper.style.transform = "scale(1)";
        section5wrapper.style.transform = "scale(1.5)";
        progressCounter();
        bool = false;
      }

      if (counter1 === -1) {
        Array.from(sections).forEach((section) => {
          if (section.classList[0] === "section-5") {
            return;
          }
          section.style.left = "-100vw";
        });
        counter1 = 4;
        counter2 = 5;
        section1wrapper.style.transform = "scale(1.5)";
        section5wrapper.style.transform = "scale(1)";
        progressCounter();
        bool = false;
      }
      progressCounter();
      return bool;
    };

    const handleWheel = (e) => {
      const deltaY = e.deltaY > 0;

      if (deltaY) {
        counter1++;
        counter2++;
      } else {
        counter1--;
        counter2--;
      }

      pageController();
      progressCounter();

      if (bool) {
        document.querySelector(
          `.section-${deltaY ? counter1 : counter2}`
        ).style.left = `${deltaY ? "-100vw" : "0"}`;

        document.querySelector(
          `.section-${deltaY ? counter1 : counter2}-wrapper`
        ).style.transform = `scale(${deltaY ? "1.5" : "1"})`;

        document.querySelector(
          `.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`
        ).style.transform = `scale(${deltaY ? "1" : "1.5"})`;
      }
    };

    const handleLeftBtnClick = () => {
      counter1--;
      counter2--;
      pageController() &&
        (document.querySelector(`.section-${counter2}`).style.left = "0");

      if (bool) {
        document.querySelector(`.section-${counter2}-wrapper`).style.transform =
          "scale(1)";
        document.querySelector(
          `.section-${counter2 + 1}-wrapper`
        ).style.transform = "scale(1.5)";
      }
    };

    const handleRightBtnClick = () => {
      counter1++;
      counter2++;
      pageController() &&
        (document.querySelector(`.section-${counter1}`).style.left = "-100vw");

      if (bool) {
        document.querySelector(`.section-${counter2}-wrapper`).style.transform =
          "scale(1)";
        document.querySelector(`.section-${counter1}-wrapper`).style.transform =
          "scale(1.5)";
      }
    };

    const handleGrapesMouseover = () => {
      document.querySelector(".section-3-wrapper").style.opacity = ".5";
    };

    const handleGrapesMouseout = () => {
      document.querySelector(".section-3-wrapper").style.opacity = "1";
    };

    const handleMenuClick = (event) => {
      event.preventDefault();

      const navbar = document.querySelector(".navbar");
      navbar.classList.toggle("change");
    };

    window.addEventListener("wheel", handleWheel);
    document
      .querySelector(".left-btn")
      .addEventListener("click", handleLeftBtnClick);
    document
      .querySelector(".right-btn")
      .addEventListener("click", handleRightBtnClick);
    document
      .querySelector(".grapes-img")
      .addEventListener("mouseover", handleGrapesMouseover);
    document
      .querySelector(".grapes-img")
      .addEventListener("mouseout", handleGrapesMouseout);
    const menu = document.querySelector(".menu");
    if (menu) {
      menu.addEventListener("click", handleMenuClick);
    } else {
      console.error("Menu element not found");
    }

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document
        .querySelector(".left-btn")
        .removeEventListener("click", handleLeftBtnClick);
      document
        .querySelector(".right-btn")
        .removeEventListener("click", handleRightBtnClick);
      document
        .querySelector(".grapes-img")
        .removeEventListener("mouseover", handleGrapesMouseover);
      document
        .querySelector(".grapes-img")
        .removeEventListener("mouseout", handleGrapesMouseout);
      if (menu) {
        menu.removeEventListener("click", handleMenuClick);
      }
    };
  }, []);
  return (
    <div className="container">
      <div className="navbar">
        <a href="#" className="logo-link">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </a>

        <a href="#" className="menu" id="menu23">
          <div className="menu-line menu-line-1"></div>
          <div className="menu-line menu-line-2"></div>
          <div className="menu-line menu-line-3"></div>
        </a>

        <nav className="nav-list">
          {/* 
          <a href="#" className="nav-link nav-link-1">
            Home
          </a>
          <a href="#" className="nav-link nav-link-2">
            Vineyards
          </a>
          <a href="#" className="nav-link nav-link-3">
            Grapes
          </a>
      */}
          <a href="/catalogue" className="nav-link nav-link-4">
            Catalogue{" "}
          </a>
          <a href="/contact" className="nav-link nav-link-5">
            Contact
          </a>
        </nav>
      </div>

      <button className="page-btn left-btn">
        <img src="/images/arrow.png" />
      </button>
      <button className="page-btn right-btn">
        <img src="/images/arrow.png" />
      </button>

      <div className="progress-wrapper">
        <div className="progress">
          <h2>1/5</h2>
        </div>
        <div className="circle-wrapper">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>
      </div>

      <div className="wrapper">
        <section className="section-1">
          <div className="section-wrapper section-1-wrapper">
            <div className="section-1-heading-wrapper">
              <h1 className="section-1-heading">
                The best wines around the world
              </h1>
            </div>
          </div>
        </section>
        <section className="section-2">
          <div className="section-wrapper section-2-wrapper">
            <div className="sale">
              <img src="/images/bag.png" alt="Sale Bag" className="sale-bag" />
              <button className="sale-btn">
                {" "}
                <a href="/checkout">order now!</a>{" "}
              </button>
            </div>
            <img
              src="/images/wine-bottle.png"
              alt="Wine Bottle"
              className="wine-bottle"
            />
          </div>
        </section>
        <section className="section-3">
          <div className="section-wrapper section-3-wrapper">
            <h1 className="section-3-heading">the best quality</h1>
            <img
              src="/images/frame.png"
              alt="Grapes Frame"
              className="frame-img"
            />
            <img src="/images/grapes.png" alt="Grapes" className="grapes-img" />
          </div>
        </section>
        <section className="section-4">
          <div className="section-wrapper section-4-wrapper">
            <div className="section-4-bg"></div>
            <h1 className="section-4-heading">Newly Released Wines</h1>
            <img
              src="/images/section-4-bg.jpg"
              alt="New Wines"
              className="new-wines-img"
            />
          </div>
        </section>
        <section className="section-5">
          <div className="section-wrapper section-5-wrapper">
            <ul className="footer-list">
              <li>Contact</li>
              <li>TB</li>
              <li>Gldani</li>
              <li>Open Daily</li>
              <li>Online Payment</li>
            </ul>
            <img src="/images/footer-img.png" className="footer-img" />
            <ul className="footer-list">
              <li>Connect</li>
              <li>PN: 555 555 555</li>
              <li>MN: 555-555-555</li>
              <li>example@example.example</li>
              <li>Join our mailing list</li>
            </ul>
            <p className="copyright">Copyright &copy; All Rights Reserved</p>
          </div>
        </section>
      </div>
    </div>
  );
}
