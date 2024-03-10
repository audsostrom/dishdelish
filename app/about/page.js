import MultiplePizzas from "../../assets/thisisbanner.png";
import "./about.css";

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas.src})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
        Welcome to Dish Delish, your ultimate destination for culinary inspiration! 
        Our team of chefs, bloggers, and experts curates a diverse collection of mouthwatering recipes, cooking tips, and culinary inspiration. Whether you're a seasoned home chef or a novice cook, our comprehensive recipe database caters to all skill levels and tastes, with detailed instructions and helpful tips to guide you through each dish. 
        Dive into our community forums to connect with fellow food enthusiasts, share experiences, and seek advice from our culinary experts. Dish Delish is your go-to hub for exploring new flavors, mastering cooking techniques, and indulging in epicurean adventures.
        Join us as we celebrate the joy of cooking and savor the magic of food together at Dish Delish – where every meal is a celebration of taste and tradition. Let's cook, create, and embark on a flavorful journey through the world of food, one delicious dish at a time. Welcome to our kitchen – let's get cooking!

        </p>
      </div>
    </div>
  );
}

export default About;
