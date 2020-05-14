package com.quince.rentingapp.domain.car;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.quince.rentingapp.domain.BaseEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
@Entity
@Data
@SequenceGenerator(name = "ID_GENERATOR", sequenceName = "CarSeq")
@Table(name = "Cars")
public class Car extends BaseEntity {

    private String name;

    private Double engineSize;

    private String colorCode;

    private String brand;

    private String series;

    private double year;

    private String fuel;

    private String carBody;

    private String gear;

    private String imageUrl;

    private String gltfUrl;

    private boolean available;

    @JsonBackReference
    @Transient
    private MultipartFile imageFile;

    @JsonBackReference
    @Transient
    private MultipartFile gltfFile;


}
