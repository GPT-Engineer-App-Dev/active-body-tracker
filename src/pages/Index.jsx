import React, { useState, useEffect } from "react";
import { Container, VStack, Heading, Text, Input, Button, List, ListItem, useToast, Box, IconButton } from "@chakra-ui/react";
import { FaDumbbell, FaTrash } from "react-icons/fa";

const Index = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState({ name: "", duration: "", date: "" });
  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(storedWorkouts);
  }, []);

  const addWorkout = () => {
    if (workoutDetails.name.trim() === "" || workoutDetails.duration.trim() === "" || workoutDetails.date.trim() === "") {
      toast({
        title: "Error",
        description: "Please fill in all workout details",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newWorkouts = [...workouts, { id: Date.now(), ...workoutDetails }];
    setWorkouts(newWorkouts);
    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    setWorkoutDetails({ name: "", duration: "", date: "" });
    toast({
      title: "Workout added",
      description: "Your workout has been logged successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteWorkout = (id) => {
    const updatedWorkouts = workouts.filter(workout => workout.id !== id);
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    toast({
      title: "Workout deleted",
      description: "Your workout has been removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

return (
    <Container centerContent maxW="container.md" height="100vh" py={8}>
      <VStack spacing={8} align="stretch" w="100%">
        <Heading textAlign="center">
          <FaDumbbell /> Fitness Tracker
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Log your workouts and stay fit!
        </Text>
        <VStack as="form" onSubmit={(e) => { e.preventDefault(); addWorkout(); }}>
          <Input
            placeholder="Workout name"
            value={workoutDetails.name}
            onChange={(e) => setWorkoutDetails({...workoutDetails, name: e.target.value})}
          />
          <Input
            placeholder="Duration (e.g., 30 minutes)"
            value={workoutDetails.duration}
            onChange={(e) => setWorkoutDetails({...workoutDetails, duration: e.target.value})}
          />
          <Input
            type="date"
            value={workoutDetails.date}
            onChange={(e) => setWorkoutDetails({...workoutDetails, date: e.target.value})}
          />
          <Button colorScheme="blue" onClick={addWorkout} leftIcon={<FaDumbbell />}>
            Log Workout
          </Button>
        </VStack>
        <List spacing={3}>
          {workouts.map((workout) => (
            <ListItem key={workout.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
              <Box>
                <Text fontWeight="bold">{workout.name}</Text>
                <Text>Duration: {workout.duration}</Text>
                <Text>Date: {workout.date}</Text>
              </Box>
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteWorkout(workout.id)}
                aria-label="Delete workout"
                size="sm"
                colorScheme="red"
                float="right"
              />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;