import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { getAllBlogs } from "../data/blogData";
import BlogCard from "../components/blog/BlogCard";

/**
 * Blog Listing Page
 * Displays all blog posts in a grid layout with SEO optimization
 */
function Blog() {
  const blogPosts = getAllBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DSAOrbit Blog",
    description:
      "Expert insights on DSA preparation, coding streaks, placement strategies, and interview preparation for software engineering roles.",
    url: "https://dsa-orbit.vercel.app/blog",
    publisher: {
      "@type": "Organization",
      name: "DSAOrbit",
      logo: {
        "@type": "ImageObject",
        url: "https://dsa-orbit.vercel.app/logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: `https://dsa-orbit.vercel.app/blog/${post.slug}`,
      datePublished: post.publishDate,
      author: {
        "@type": "Organization",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>DSAOrbit Blog – Coding & Placement Strategy</title>
        <meta
          name="description"
          content="Master DSA preparation with expert guidance. Learn effective tracking strategies, build coding streaks, understand topic-wise preparation, and ace your placement interviews with DSAOrbit's comprehensive blog."
        />
        <meta
          name="keywords"
          content="DSA blog, coding interview preparation, placement strategy, DSA progress tracking, coding streaks, topic-wise DSA preparation, interview tips, algorithm learning"
        />
        <link rel="canonical" href="https://dsa-orbit.vercel.app/blog" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="DSAOrbit Blog – Coding & Placement Strategy"
        />
        <meta
          property="og:description"
          content="Expert insights on DSA preparation, coding streaks, and placement strategies. Learn from battle-tested techniques to ace your coding interviews."
        />
        <meta property="og:url" content="https://dsa-orbit.vercel.app/blog" />
        <meta
          property="og:image"
          content="https://dsa-orbit.vercel.app/blog-preview.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DSAOrbit Blog – Coding & Placement Strategy"
        />
        <meta
          name="twitter:description"
          content="Master DSA preparation with expert guidance on progress tracking, coding streaks, and interview strategies."
        />
        <meta
          name="twitter:image"
          content="https://dsa-orbit.vercel.app/blog-preview.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            DSAOrbit Blog – Coding & Placement Strategy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
            Welcome to the DSAOrbit blog — your go-to guide for mastering Data
            Structures and Algorithms. Whether you're preparing for placements
            or sharpening interview skills, we share practical strategies,
            proven techniques, and expert insights to help you succeed. Learn
            how to track progress, build consistent coding habits, and prepare
            topic-wise with smart tools — all designed to help you land offers
            at top tech companies. 🚀
          </p>
        </motion.header>

        {/* Blog Grid */}
        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="card p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your DSA Preparation?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Start tracking your progress with DSAOrbit today. Build streaks,
            analyze weak topics, and ace your placement interviews.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
          >
            Start Tracking Progress →
          </a>
        </motion.section>
      </motion.div>
    </>
  );
}

export default Blog;
