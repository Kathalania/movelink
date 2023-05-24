import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { Move } from '../models/Move';
import './ChoreoMoveCard.css';

type ChoreoMoveCardProps = {
    move: Move;
    onMoveClick: (move: Move) => void;
}

export default function ChoreoMoveCard(props: ChoreoMoveCardProps) {

    const { move, onMoveClick } = props

    return (
        <div
            className="choreo-move-card"
            onClick={() => onMoveClick(move)}
        >
            <Container maxWidth="md">
                <Card style={{ backgroundColor: '#1B1E24', color: 'lightgrey', justifyContent: 'flex-start' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {move.name}
                        </Typography>
                        <Typography variant="body1" color="lightgrey">
                            {move.style}
                        </Typography>
                        <Typography variant="body1" color="lightgrey">
                            {move.count} - count
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}