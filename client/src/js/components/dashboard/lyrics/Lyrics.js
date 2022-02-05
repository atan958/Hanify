import React from 'react';

/*
/ Displays the lyrics of the currently playing track
*/
const Lyrics = ({ lyrics }) => {
    return (
        <div className="text-center py-4" style={{ whiteSpace: "pre" }}>
            {lyrics.map((line, index) =>{
                return (
                    <div className="lyric-line highlight" style={{ animationDuration: `${index*0.1}s` }}>
                        {line}
                        <br/>
                    </div>
                );
            })}
        </div>
    );
};

export default Lyrics;
