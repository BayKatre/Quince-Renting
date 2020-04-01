package com.quince.rentingapp.service;

import com.quince.rentingapp.domain.car.*;
import com.quince.rentingapp.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CarService {

    public CarRepository carRepository;


    public Car findById(Long id){
        return carRepository.findById(id).
        orElseThrow(() -> new ResourceAccessException("Car with " + id + " not found"));
    }
    public List<Car> findAll(){
        return carRepository.findAll();
    }
    public List<Car> findByBrand(CarBrand carBrand){
        return carRepository.findByBrand(carBrand);
    }
    public List<Car> findByYear(double year){
        return carRepository.findByYear(year);
    }
    public List<Car> findByBody(CarBody body){
        return carRepository.findByCarBody(body);
    }
    public List<Car> findByTransmission(CarTransmissionType gear){
        return carRepository.findByGear(gear);
    }
    public List<Car> findByFuel(CarFuelType fuel){
        return carRepository.findByFuel(fuel);
    }
    public void saveCar(Car newCar){
        carRepository.save(newCar);
    }
    public void deleteCar(Car car){
        Car carFromDB =carRepository.findById(car.getId()).
                orElseThrow(() -> new ResourceAccessException("Car with " + car.getId() + " not found"));
        carRepository.delete(carFromDB);
    }

}
