import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Image as ImageIcon, Info, Video } from "lucide-react"
import Navbar from '@/components/home/Navbar'
import PhotoSwap from '@/components/home/PhotoSwap'
import VideoFaceSwap from '@/components/home/VideoFaceSwap'
import ChangeClothes from '@/components/home/ChangeClothes'
import Suggested from '@/components/home/Suggested'
import MyVideos from '@/components/home/MyVideos'
import TopupModal from '@/components/home/TopupModal'
import { useClientStore } from '@/store/user-store'
import { FaArrowLeft } from 'react-icons/fa'
import LoginModal from '@/components/home/LoginModal'
import { AnimatePresence, motion as m } from 'framer-motion'

const Home = () => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video' | 'clothes' | 'suggested' | 'my-videos'>('photo');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [targetPhotoUrl, setTargetPhotoUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [targetVideoUrl, setTargetVideoUrl] = useState<string | null>(null);
  const [clothUrl, setClothUrl] = useState<string | null>(null);
  const [targetClothUrl, ] = useState<string | null>(null);
  const [showProcessedMedia, setShowProcessedMedia] = useState(false);
  const [suggestedVideoId, setSuggestedVideoId] = useState<string | null>(null);

  const processedMedia = [
    { id: 1, type: 'video', name: 'Video 1', createdAt: '2023-06-01', expiresAt: '2023-07-01' },
    { id: 2, type: 'image', name: 'Image 1', createdAt: '2023-06-02', expiresAt: '2023-07-02' },
    // ... add more items as needed
  ]

  const balance = 100;
  

  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);

  const { auth } = useClientStore();

  const [modalToOpen, setModalToOpen] = useState<'login' | 'sign-up' | 'hidden'>('hidden');


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
    <Navbar showProcessedMedia={showProcessedMedia} setShowProcessedMedia={setShowProcessedMedia}/>

    <TopupModal isTopupOpen={isTopUpOpen} setIsTopUpOpen={setIsTopUpOpen} />

    {/* Back Button */}

    <m.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`${!auth ? 'filter blur-md pointer-events-none' : ''}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {showProcessedMedia ? (
              <div className="space-y-6">
                  <div className='flex gap-x-2 w-fit items-center cursor-pointer hover:scale-[1.05] active:scale-[0.99] transition-all' onClick={() => setShowProcessedMedia(false)}>
                    <FaArrowLeft />
                    <p>Back</p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Processed Media</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {processedMedia.map((item) => (
                      <Card key={item.id}>
                      <CardContent className="p-4">
                          <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md mb-2">
                          {item.type === 'video' ? ( <Video className="w-12 h-12 text-gray-400" /> ) : (<ImageIcon className="w-12 h-12 text-gray-400" /> )}
                          </div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">Created: {item.createdAt}</p>
                          <p className="text-sm text-gray-500">Expires: {item.expiresAt}</p>
                      </CardContent>
                      </Card>
                      ))}
                  </div>
              </div>
          ) : (
              <>
                  <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">AI Face Swap & Clothes Change</h1>
                  <p className="text-center text-gray-600 mb-8">Upload your photos or videos to swap faces or change clothes. Be whoever you want to be!</p>
                  { auth?.access_token && <p className='flex justify-center items-center gap-x-5 mb-8'>
                    <span>Balance: ${balance}</span>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => setIsTopUpOpen(true)}>Top up</Button>
                  </p> }
                  <div className="flex flex-col sm:flex-row sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-8">
                      <Button className={`${activeTab === 'photo' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('photo')}>Photo Face Swap</Button>
                      <Button className={`${activeTab === 'video' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('video')}>Video Face Swap</Button>
                      <Button className={`${activeTab === 'clothes' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('clothes')}>Change Clothes</Button>
                      <Button className={`${activeTab === 'suggested' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('suggested')}>Suggested</Button>
                      <Button className={`${activeTab === 'my-videos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:text-purple-600 hover:bg-[#F6F6F6]'}`} onClick={() => setActiveTab('my-videos')}>My Videos</Button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    {
                      activeTab === 'photo' &&
                      <div className="md:w-1/2 flex-1 ">
                          {photoUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Source Photo</h1>
                          <div className="mb-4"> <img src={photoUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" /></div>
                          </>
                          )
                          }
                          {targetPhotoUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Target Photo</h1>
                          <div className="mb-4"><img src={targetPhotoUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" /></div>
                          </>
                          )
                          }
                          <p className="mt-4 text-sm text-gray-500 flex items-center "> <Info className="w-4 h-4 mr-1" /> Disclaimer: This AI service is for personal entertainment only. Please do not distribute or use the modified content for illegal purposes.</p>
                      </div>
                    }
                      {
                      activeTab === 'video' &&
                      <div className="md:w-1/2 flex-1 ">
                          {videoUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Source Photo</h1>
                          <div className="mb-4"><img src={videoUrl} className="w-full rounded-lg shadow-lg h-[500px] object-contain" /></div>
                          </>
                          )
                          }
                          {targetVideoUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Target Video</h1>
                          <div className="mb-4"><video src={targetVideoUrl} controls className="w-full rounded-lg shadow-lg" /></div>
                          </>
                          )
                          }
                          <p className="mt-4 text-sm text-gray-500 flex items-center "> <Info className="w-4 h-4 mr-1" /> Disclaimer: This AI service is for personal entertainment only. Please do not distribute or use the modified content for illegal purposes.</p>
                      </div>
                    }
                      {
                      activeTab === 'clothes' &&
                      <div className="md:w-1/2 flex-1 ">
                          {clothUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Source Photo</h1>
                          <div className="mb-4"> <img src={clothUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" /></div>
                          </>
                          )
                          }
                          {targetClothUrl && (
                          <>
                          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Target Photo</h1>
                          <div className="mb-4"><img src={targetClothUrl} alt="Uploaded source" className="w-full h-[500px] object-contain rounded-lg shadow-lg" /></div>
                          </>
                          )
                          }
                          <p className="mt-4 text-sm text-gray-500 flex items-center "> <Info className="w-4 h-4 mr-1" /> Disclaimer: This AI service is for personal entertainment only. Please do not distribute or use the modified content for illegal purposes.</p>
                      </div>
                    }
                  <div className={`${ activeTab === 'suggested' ? 'w-full' : "md:w-1/2"}`}>
                    <PhotoSwap active={activeTab === 'photo'} setPreviewUrl={setPhotoUrl} setPreviewTargetUrl={setTargetPhotoUrl} />
                    <VideoFaceSwap active={activeTab === 'video'} setPreviewUrl={setVideoUrl} setPreviewTargetUrl={setTargetVideoUrl} targetId={suggestedVideoId} setTargetId={setSuggestedVideoId} targetVideoUrl={targetVideoUrl} videoUrl={videoUrl}/>
                    <ChangeClothes active={activeTab === 'clothes'} setPreviewUrl={setClothUrl} />
                    <Suggested active={activeTab === 'suggested'} goToVideo={() => setActiveTab('video')} setPreviewTargetUrl={setTargetVideoUrl} setTargetId={setSuggestedVideoId}/>
                    <MyVideos active={activeTab === 'my-videos'} />
                  </div>
              </div>
          </>
          )}
      </main>
    </m.div>
    <AnimatePresence>
      {!auth && modalToOpen === 'hidden' && (
          <m.div
          initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Please Log In</h2>
              <p className="text-gray-600 mb-6">You must log in to access this page.</p>
              <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => { setModalToOpen('login') }}>Log In</Button>
            </div>
          </m.div>
        )}
    </AnimatePresence>
    {/* {modalToOpen !== 'hidden' &&  */}
    <LoginModal isLoginOpen={modalToOpen === 'login'} setIsLoginOpen={setModalToOpen} />
    {/* } */}
    
    </div>
  )
}

export default Home