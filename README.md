📸 Instagram Reels Assignment

A simple React Native application that mimics an Instagram-like timeline with features such as Like, Save, and Share using local device storage via AsyncStorage.

---

🧰 Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [React Navigation](https://reactnavigation.org/)
- Icons from [@expo/vector-icons](https://icons.expo.fyi/)

---

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/acrodney/InstagramReelsAssignment.git
cd InstagramReelsAssignment

2. Install Dependencies

npm install

Or with Yarn:

yarn

3. Run the App

expo start

---

📱 Features

✅ Timeline Screen

- Fetches mock post data from a public API.
- Renders posts in a scrollable feed.

❤️ Like Posts

- Tap the heart icon to like or unlike a post.
- Likes are saved using `AsyncStorage`.

📌 Save Posts

- Tap the bookmark icon to save or unsave a post.
- Saved posts are also stored locally on the device.

📤 Share Posts

- Tap the share icon to toggle shared status.
- When shared, a custom link (with `postId`) is copied to clipboard.
- Device vibrates to give feedback.

---

📂 Folder Structure

App/
│
├── comps/
│ ├── LikeComp.js
│ ├── SavePost.js
│ ├── SharePost.js
│
├── screens/
│ └── TimelineScreen.js
│
├── utils/
│ └── dummyData.js (optional)

---

⚙️ Custom Logic

- AsyncStorage Keys

  - `"liked_posts"` → Stores array of liked `postId`s
  - `"saved_posts"` → Stores array of saved `postId`s
  - `"shared_post"` → Stores array of shared `postId`s

- Clipboard Sharing

  - Constructs a custom link like `https://myapp.com/post/123`
  - Copies it on click

- Device Vibration
  - Uses `Vibration.vibrate()` on share click

---

👨🏽‍💻 Author

Rodney Chukwuemeka  
[GitHub: @acrodney](https://github.com/acrodney)

---

📝 License

MIT License — feel free to use and modify this for learning or practice purposes.
