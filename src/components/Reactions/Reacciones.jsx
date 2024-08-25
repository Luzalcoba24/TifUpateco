import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { fetchReactions } from "../../hooks/ConnReactions";

const Reacciones = ({ articleId }) => {
    const [reactions, setReactions] = useState([]);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        const loadReactions = async () => {
            try {
                const reactionsData = await fetchReactions();
                setReactions(reactionsData);

                const articleReactions = await fetchArticleReactions(articleId);
                const likedReaction = reactionsData.find(r => r.font_awesome_icon === 'fa-solid fa-thumbs-up');
                const dislikedReaction = reactionsData.find(r => r.font_awesome_icon === 'fa-solid fa-thumbs-down');

                setLiked(articleReactions.includes(likedReaction.id));
                setDisliked(articleReactions.includes(dislikedReaction.id));
            } catch (error) {
                console.error("Error al cargar las reacciones:", error);
            }
        };

        loadReactions();
    }, [articleId]);

    const handleLike = async () => {
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/reactions/like/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Añadir headers de autorización si es necesario
                },
                body: JSON.stringify({ article: articleId })
            });
            if (!response.ok) {
                throw new Error("Error al dar like");
            }
            setLiked(true);
            setDisliked(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/reactions/dislike/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Añadir headers de autorización si es necesario
                },
                body: JSON.stringify({ article: articleId })
            });
            if (!response.ok) {
                throw new Error("Error al dar dislike");
            }
            setLiked(false);
            setDisliked(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="d-flex">
            <button onClick={handleLike} className={`btn ${liked ? 'btn-primary' : 'btn-outline-primary'}`}>
                <FontAwesomeIcon icon={faThumbsUp} /> Like
            </button>
            <button onClick={handleDislike} className={`btn ${disliked ? 'btn-danger' : 'btn-outline-danger'}`}>
                <FontAwesomeIcon icon={faThumbsDown} /> Dislike
            </button>
        </div>
    );
};

export default Reacciones;
