import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from 'styled-components';
import boardBackground from "../assets/board.svg";
import Marker1 from "../assets/marker_1.svg";
import Marker2 from "../assets/marker_2.svg";
import Marker3 from "../assets/marker_3.svg";
import Marker4 from "../assets/marker_4.svg";

const markers_position_array = [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[9,8],[8,8],[7,8],[6,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[9,6],[8,6],[7,6],[6,6],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[9,4],[8,4],[7,4],[6,4],[5,4],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[9,2],[8,2],[7,2],[6,2],[5,2],[4,2],[3,2],[2,2],[1,2],[0,2],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[9,0],[8,0],[7,0],[6,0],[5,0],[4,0],[3,0],[2,0],[1,0],[0,0]]

const Marker = styled.img`
    position: absolute;
    z-index: 1;
    display: none;
    transition: top 0.5s ease, left 0.5s ease;
`

const Board = forwardRef(({
    width,
    height
}, ref) =>{
    const markerWidth = width/10
    const markerHeight = height/10

    const marker_1_ref = useRef(null)
    const marker_2_ref = useRef(null)
    const marker_3_ref = useRef(null)
    const marker_4_ref = useRef(null)
    const marker_ref_map = {
        1: marker_1_ref,
        2: marker_2_ref,
        3: marker_3_ref,
        4: marker_4_ref
    }
    const marker_pos = useRef({
        1: 0,
        2: 0,
        3: 0,
        4: 0
    })
    const [is_rolling_dice, set_is_rolling_dice] = useState(false);

    function move_marker(marker_id, no) {
        if(no < 0 || no > 100) return;
        const marker_ref = marker_ref_map[marker_id]
        if(!marker_ref) return;
        if(no === 0){
            marker_ref.current.style.display = 'none'
            return
        }
        marker_ref.current.style.display = 'block'
        marker_ref.current.style.left = `${markers_position_array[no-1][0]*markerWidth}px`
        marker_ref.current.style.top = `${markers_position_array[no-1][1]*markerHeight}px`
    }

    function update_markers(payload) {
        marker_pos.current = payload;
        for(let i=0; i<4; i++){
            move_marker(i+1, marker_pos.current[i+1]);
        }
    }

    function roll_dice() {
        
    }

    // expose function
    useImperativeHandle(ref, () => ({
        update_markers: update_markers
      }));

    return (
        <div style={{
            width: `${width+2}px`,
            height: `${height+2}px`,
            minWidth: `${width+2}px`,
            minHeight: `${height+2}px`,
            maxWidth: `${width+2}px`,
            maxHeight: `${height+2}px`,
            display: 'block',
            position: 'relative',
            border: '1px solid black'
        }}>
            {/* baoard background */}
            <img
                src={boardBackground}
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
            {/* marker 1 */}
            <Marker
                ref={marker_1_ref}
                src={Marker1}
                style={{
                    width: `${markerWidth}px`,
                    height: `${markerHeight}px`
                }}
            />
            {/* marker 2 */}
            <Marker
                ref={marker_2_ref}
                src={Marker2}
                style={{
                    width: `${markerWidth}px`,
                    height: `${markerHeight}px`
                }}
            />
            {/* marker 3 */}
            <Marker
                ref={marker_3_ref}
                src={Marker3}
                style={{
                    width: `${markerWidth}px`,
                    height: `${markerHeight}px`
                }}
            />
            {/* marker 4 */}
            <Marker
                ref={marker_4_ref}
                src={Marker4}
                style={{
                    width: `${markerWidth}px`,
                    height: `${markerHeight}px`
                }}
            />
            {/* overlay */}
            <div style={{
                width: `${width}px`,
                height: `${height}px`,
                zIndex: 2,
                backgroundColor: 'black',
                position: 'absolute',
                opacity: 0.3,
                display: is_rolling_dice ? 'block' : 'none'
            }}>
            </div>
            {/* rolling dice */}
        </div>
    )
})

export default Board