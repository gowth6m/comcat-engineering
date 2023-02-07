import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";

export default function AboutScreen() {
  return (
    <Layout title="About Us">
      <div className="mx-auto md:w-4/6 mb-4">
        <div className="heading1 mt-2 md:mt-4">About Us</div>
        <div className="flex flex-row">
          <div className="text-black flex flex-col gap-4">
            <Image
              className="w-full h-full object-cover rounded-lg md:hidden"
              src="/assets/about_img.jpeg"
              alt="about-img"
              width={1000}
              height={665}
            ></Image>
            <div>
              Welcome to our shop, where we specialize in fast food machinery
              and commercial machinery. Our team has been providing quality
              equipment to businesses for many years and we are proud to be a
              trusted name in the industry.
            </div>
            <div>
              We understand the importance of having reliable machinery in your
              business and that&#39;s why we only offer the best products that
              are durable and efficient. Our extensive range of machinery
              includes fryers, grills, ovens, refrigerators, and much more, so
              you can be sure that we have everything you need to run a
              successful business.
            </div>

            <div>
              In addition to our top-of-the-line machinery, we also offer expert
              repairs and fixes on any machine. Our team of skilled engineers is
              always on hand to help you with any problems that may arise and
              they are committed to providing fast and effective solutions. We
              understand that when your machinery is down, your business is
              impacted and that&#39;s why we are here to help you get back up
              and running as soon as possible.
            </div>

            <div>
              We strive for excellent customer service and satisfaction. Our
              team is ready to assist with any questions and finding the right
              equipment. Choose us for top-quality machinery, expert repairs,
              and superior customer service. Contact us today to learn more.
            </div>

            <Image
              className="w-full h-full object-cover rounded-lg hidden md:flex"
              src="/assets/about_img.jpeg"
              alt="about-img"
              width={1000}
              height={665}
              priority={true}
            ></Image>
          </div>
        </div>
      </div>
    </Layout>
  );
}
