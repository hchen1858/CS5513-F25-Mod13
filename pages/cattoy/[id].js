// Import the Layout component for consistent page structure
import Layout from '../../components/layout'; 
// Import utility functions to get all cat toy IDs and individual cat toy data
import { getAllCatToyIds, getCatToyData } from '../../lib/posts-json';
// Import Next.js Head component for managing page metadata
import Head from 'next/head';
// Import custom Date component for formatting dates
import Date from '../../components/date';
// Import utility CSS styles for consistent styling
import utilStyles from '../../styles/utils.module.css'; 


// Next.js static generation function that runs at build time
// This function fetches data for a specific cat toy item based on the dynamic route parameter
export async function getStaticProps({ params }) {
    // Extract cat toy data asynchronously using the item ID from the URL parameter
    // The "await" keyword ensures we wait for the data to be fetched before proceeding
    const postData = await getCatToyData(params.id);
   
    // Return the cat toy data as props to be passed to the CatToy component
    return {
      props: {
        postData,
      },
      revalidate: 60, // Revalidate the page every 60 seconds  Next.js ISR (Incremental Static Regeneration)
    };
  }

 
// Next.js static generation function that determines which paths to pre-render
// This function tells Next.js which dynamic routes should be statically generated at build time
export async function getStaticPaths() {
  // Get all available cat toy IDs to determine which pages to generate
  const paths = await getAllCatToyIds();
  return {
    paths, // Array of paths to pre-render
    fallback: false, // If a path is not found, return 404 (no fallback generation)
  };
}



// Main React component that renders an individual cat toy item
// Receives postData as props from getStaticProps
export default function CatToy({ postData }) {
    return (
    // Wrap the content in the Layout component for consistent page structure
      <Layout>
        {/* Use Next.js Head component to set the page title dynamically */}
        <Head>
          <title>{postData.acf.toy_name}</title>
        </Head>
        {/* Main article container with blog-specific styling */}
        <article className={utilStyles.blogArticle}>
          {/* Display the post title as the main heading */}
          <h1 className={utilStyles.headingXl}>Notes About {postData.acf.toy_name}</h1>      
          {/* Date container with custom styling */}
          <div className={utilStyles.dateTextPost}>
            <p><strong>Toy Name:</strong> {postData.acf.toy_name}</p>
            <p><strong>Description:</strong> {postData.acf.toy_description}</p>
            <p><strong>Toy Rating:</strong> {postData.acf.toy_rating}</p>
          </div>
          <small className={utilStyles.lightText}>
              <Date dateString={postData.date} />
          </small>
         </article>
      </Layout>
    );
  }

  

