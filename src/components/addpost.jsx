import React, { useState, useRef} from 'react';
import { Camera, Image, MapPin, Smile, X, Users, Globe, Lock } from 'lucide-react';
import { Postlist } from './store';
import { addpost } from '../Api';
import { useParams } from 'react-router-dom';

export default function CreatePost() {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [location, setLocation] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // useRef for DOM elements and avoiding re-renders
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

      // const {addtopostlist}=useContext(Postlist)
         const {username}= useParams()

  const emojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '💯', '🌟', '👏', '💪', '🙌', '✨' ,'he yo all'];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
    // Clear the input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (id) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  const addEmoji = (emoji) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = postText.slice(0, start) + emoji + postText.slice(end);
      setPostText(newText);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setPostText(prev => prev + emoji);
    }
    setShowEmojiPicker(false);
  };

  const handlePost = async () => {
  if (!postText.trim() && selectedImages.length === 0) {
    alert('Please add some content to your post');
    return;
  }

  try {
    // const newpost =
     await addpost({
      user_name: username,
      description: postText,
      url: selectedImages[0]?.url || "",
      tags: postText.match(/#[\w]+/g) || [],
    });
    // addtopostlist(newpost) 

    setPostText('');
    setSelectedImages([]);
    setLocation('');
  } catch (err) {
    console.error("Failed to post:", err.message);
    alert("Post failed");
  }
};


  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-green-600 ">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-800 rounded-full flex items-center justify-center">
          <span className="text-gray-400 font-semibold">U</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-400">Create Post</h3>
          <div className="flex items-center space-x-2 ">
            <select 
              value={privacy} 
              onChange={(e) => setPrivacy(e.target.value)}
              className="text-sm text-gray-400 border-none outline-none cursor-pointer bg-gray-800"
            >
              <option value="public">🌍 Public</option>
              <option value="friends">👥 Friends</option>
              <option value="private">🔒 Only me</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Text Input */}
      <div className="mb-4">
        <textarea
          ref={textareaRef}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 text-lg border-none outline-none resize-none min-h-[120px] placeholder-gray-300 text-gray-300"
          maxLength={500}
        />
        <div className="text-right text-sm text-gray-400">
          {postText.length}/500
        </div>
      </div>

      {/* Image Preview */}
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 max-h-max overflow-y-auto">
            {selectedImages.map((img) => (
              <div key={img.id} className="relative group">
                <img 
                  src={img.url} 
                  alt={img.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={40} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location Input */}
      {location && (
        <div className="mb-4 flex items-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
          <button 
            onClick={() => setLocation('')}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-6 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-2xl hover:bg-gray-200 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {/* Photo/Video Upload */}
          <button 
            onClick={triggerFileInput}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Image size={20} />
            <span className="text-sm font-medium">Photo</span>
          </button>

          {/* Camera */}
          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
            <Camera size={20} />
            <span className="text-sm font-medium">Camera</span>
          </button>

          {/* Location */}
          <button 
            onClick={() => setLocation('Current Location')}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <MapPin size={20} />
            <span className="text-sm font-medium">Location</span>
          </button>

          {/* Emoji */}
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <Smile size={20} />
            <span className="text-sm font-medium">Feeling</span>
          </button>
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!postText.trim() && selectedImages.length === 0}
          className="px-6 py-2  text-white rounded-lg font-medium  hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
          enabled:bg-gradient-to-l from-green-400 vai-green-600 to-green-800
          transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
}