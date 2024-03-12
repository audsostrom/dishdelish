# DishDelish

DishDelish is a recipe discovery application that helps users find recipes based on available ingredients, dietary preferences, and more. Whether you're a seasoned chef or a cooking novice, DishDelish has something for everyone.

## Features

- **Ingredient Inputs:** Input the ingredients you have on hand and get recipe recommendations based on what you already have.
- **Recipe Search:** Search for recipes using specific ingredients, dietary restrictions, cuisine preferences, and more.
- **User Profiles:** Create a user profile to save favorite recipes, view previously searched ingredients, and personalize your cooking experience.
- **User-Friendly Interface:** Clean and intuitive interface design makes navigating DishDelish a breeze.

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd DishDelish
    ```

2. **Set up environment variables:**
    - Create a `.env.local` file in the root directory of the project.
    - Copy the contents of `.env.copy` into `.env.local`.
    - Replace the placeholders with your actual credentials and keys:
      ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/?retryWrites=true&w=majority
      NEXTAUTH_SECRET=<your_nextauth_secret>
      SPOONACULAR_API_KEY=<your_spoonacular_api_key>
      ```
    - To generate a NextAuth secret, you can use the following command:
      ```
      openssl rand -base64 32
      ```

3. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.**

## Resources
- [Figma](https://www.figma.com/file/OfIogM0BU2t5Mtn3DQ9ZJ9/DishDelish-Figma?type=design&node-id=0%3A1&mode=design&t=0iplRGkv9s0KNw9u-1)
- [Release Plan](https://docs.google.com/document/d/1okG1wC7vBGes1hUQOb5VPI0qDLEyIrIh3EyvKF1AteQ/edit?usp=sharing)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

We welcome contributions from the community. If you find any bugs, have feature requests, or want to contribute enhancements, please open an issue or submit a pull request.

## Acknowledgements

Special thanks to our team members for their dedication and hard work in developing DishDelish.
