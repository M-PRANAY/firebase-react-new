import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
	const [movieList, SetmovieList] = useState([]);

	const [newMovieTitle, setnewMovieTitle] = useState("");
	const [newReleaseDate, setnewReleaseDate] = useState(0);
	const [updatedTitle, setupdatedTitle] = useState("");
	const [file, setfile] = useState(null);
	const moviesCollectionRef = collection(db, "movies");

	const handleSubmitMovie = async () => {
		try {
			await addDoc(moviesCollectionRef, {
				Title: newMovieTitle,
				Date: newReleaseDate,
				userId: auth?.currentUser?.uid,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getmovieList = async () => {
			try {
				const data = await getDocs(moviesCollectionRef);
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				// console.log(filteredData);
				SetmovieList(filteredData);
			} catch (error) {
				console.error(error);
			}
		};
		getmovieList();
	}, [handleSubmitMovie]);

	const deleteMovie = async (id) => {
		const movieDoc = doc(db, "movies", id);
		await deleteDoc(movieDoc);
	};

	const updateTitle = async (id) => {
		const movieDoc = doc(db, "movies", id);
		await updateDoc(movieDoc, { Title: updatedTitle });
	};

	const uploadFile = async () => {
		if (!file) {
			return;
		}
		const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
		try {
			await uploadBytes(filesFolderRef, file);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<Auth />

			<div>
				<input
					placeholder="Movie Title"
					onChange={(e) => setnewMovieTitle(e.target.value)}
				></input>
				<input
					placeholder="Release Date"
					type="number"
					onChange={(e) => setnewReleaseDate(Number(e.target.value))}
				></input>
				<button onClick={handleSubmitMovie}>Submit</button>
			</div>

			<div>
				{movieList.map((movie) => (
					<div key={movie.id}>
						<h1>{movie.Title}</h1>
						<h1>{movie.Date}</h1>
						<button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
						<input
							placeholder="new Title"
							onChange={(e) => setupdatedTitle(e.target.value)}
						/>
						<button onClick={() => updateTitle(movie.id)}>Uptade title</button>
					</div>
				))}
			</div>
			<div>
				<input type="file" onChange={(e) => setfile(e.target.files[0])} />
				<button onClick={uploadFile}>Upload file</button>
			</div>
		</div>
	);
}

export default App;
