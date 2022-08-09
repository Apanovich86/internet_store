package program.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tbl_products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime created = LocalDateTime.now();

    @ManyToOne()
    @JoinColumn(name="category_id", nullable = false)
    private Category category;

    @NotNull(message="Поле 'Назва продукту' не може бути пустим")
    @Size(min=2, message="Поле 'Назва продукту' повинне містити не менше двох символів")
    @Column(name="title",columnDefinition="text", nullable = false)
    private String title;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageEntity> images=new ArrayList<>();

    @Column(nullable = false)
    private Double price;

    @Column(name="description",columnDefinition="text", nullable = false)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "product_sizes",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id"))
    private Set<SizeEntity> sizes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "product_colors",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id"))
    private Set<ColorEntity> colors = new HashSet<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResponseEntity> responses=new ArrayList<>();

    @Column(name="availability",nullable = false)
    private boolean availability;

    public Product() {
    }

    public Product(LocalDateTime created, Category category, String title,
                   List<ImageEntity> images, Double price, String description,
                   Set<SizeEntity> sizes, Set<ColorEntity> colors,
                   List<ResponseEntity> responses, boolean availability) {
        this.created = created;
        this.category = category;
        this.title = title;
        this.images = images;
        this.price = price;
        this.description = description;
        this.sizes = sizes;
        this.colors = colors;
        this.responses = responses;
        this.availability = availability;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<ImageEntity> getImages() {
        return images;
    }

    public void setImages(List<ImageEntity> images) {
        this.images = images;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<SizeEntity> getSizes() {
        return sizes;
    }

    public void setSizes(Set<SizeEntity> sizes) {
        this.sizes = sizes;
    }

    public Set<ColorEntity> getColors() {
        return colors;
    }

    public void setColors(Set<ColorEntity> colors) {
        this.colors = colors;
    }

    public List<ResponseEntity> getResponses() {
        return responses;
    }

    public void setResponses(List<ResponseEntity> responses) {
        this.responses = responses;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
}
