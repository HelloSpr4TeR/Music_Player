import { Card, Container, Grid2, Step, StepLabel, Stepper } from '@mui/material'
import React, { ReactNode } from 'react'

interface StepWrapperProps {
    activeStep: number
    children: ReactNode
    className?: string;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children, className }) => {
    return (
        <Container className={className}>
            <div className="stepperWrapper">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) =>
                        <Step
                            key={index}
                            completed={activeStep > index}
                        >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )}
                </Stepper>
            </div>
            <Grid2 container justifyContent="center" style={{ margin: '70px 0', height: 270 }}>
                <Card style={{ width: 600 }}>
                    {children}
                </Card>
            </Grid2>
        </Container>
    )
}

export default StepWrapper