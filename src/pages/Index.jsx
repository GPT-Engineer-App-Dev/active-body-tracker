import React, { useState } from "react";
import { Container, VStack, Heading, Text, Input, Button, List, ListItem, useToast } from "@chakra-ui/react";
import { FaDumbbell } from "react-icons/fa";

const Index = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState("");
  const toast = useToast();

  const addWorkout = () => {
    if (newWorkout.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a workout",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setWorkouts([...workouts, { id: Date.now(), name: newWorkout }]);
    setNewWorkout("");
    toast({
      title: "Workout added",
      description: "Your workout has been logged successfully",
      status: "success",
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
            placeholder="Enter your workout"
            value={newWorkout}
            onChange={(e) => setNewWorkout(e.target.value)}
          />
          <Button colorScheme="blue" onClick={addWorkout} leftIcon={<FaDumbbell />}>
            Log Workout
          </Button>
        </VStack>
        <List spacing={3}>
          {workouts.map((workout) => (
            <ListItem key={workout.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
              {workout.name}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;