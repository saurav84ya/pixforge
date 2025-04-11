// import ImageInpute from "@/components/ImageInput";

// export default function Home() {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center " >


//       <h1 className="text-3xl font-bold mb-6">Image Converter Online</h1>


//       <div>
//         <ImageInpute />
//         <div>
//           <p className='opacity-70 text-sm text-center mt-5 ' >Images are uploaded securely, <br />
//             never shared with 3rd parties, <br />
//             and deleted permanently once <br />
//             the download link expires <br />
//             (after 24 hours)</p>
//         </div>
//         <div>
//           <h1>Select Action to Perfrom</h1>

//         </div>
//       </div>

//     </div>
//   );
// }




import Image from 'next/image'
import Link from 'next/link'
import heroImage from '../../public/heroImage.png' // Replace with your own image

export default function Home() {
  return (
    <main className=" flex flex-col justify-between px-6 py-10  text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Convert, Resize, and Optimize Images Online
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            All-in-one image tool for converting formats, resizing resolution, compressing size and more – no login required!
          </p>
          <Link href="#tools">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image src={heroImage} alt="Image Tools Preview" className="w-full max-w-md mx-auto" />
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Tools</h2>
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <Link href="/resize">
            <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Image Resizer</h3>
              <p className="text-sm text-gray-500">Resize image by width, height, or aspect ratio</p>
            </div>
          </Link>
          <Link href="/compress">
            <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Compressor</h3>
              <p className="text-sm text-gray-500">Reduce image file size without quality loss</p>
            </div>
          </Link>
          <Link href="/convert">
            <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">Format Converter</h3>
              <p className="text-sm text-gray-500">Convert between JPG, PNG, WebP and more</p>
            </div>
          </Link>
        </div>
      </section>

      <div>
     
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 mt-20 text-sm">
      <p className='text-sm text-center mb-3 ' >Images are uploaded securely, 
             never shared with 3rd parties, 
             and deleted permanently once 
             the download link expires 
            (after 24 hours)</p>

        © {new Date().getFullYear()} PixForge. All rights reserved.
      </footer>
    </main>
  )
}
