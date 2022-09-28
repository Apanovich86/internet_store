package program.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor

@Table(name="tbl_products", uniqueConstraints = {
        @UniqueConstraint(columnNames = "title")
})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDateTime created = LocalDateTime.now();

      //@ManyToOne(fetch = FetchType.EAGER, optional = false)
      @ManyToOne(fetch = FetchType.EAGER)
      @JoinColumn(
              name = "category_id",
              nullable = false
      )
    @JsonIgnore
    private Category category;

    @NotNull(message="Поле 'Назва продукту' не може бути пустим")
    @Size(min=2, message="Поле 'Назва продукту' повинне містити не менше двох символів")
    @Column(name="title",columnDefinition="text", nullable = false)
    private String title;

    @Column(name="image",nullable = true,columnDefinition="TEXT")
    private String urlImage;

    @Column(nullable = false)
    private Double price;

    @Column(name="description",columnDefinition="text", nullable = false)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(  name = "product_sizes",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id"))
    private Set<SizeEntity> sizes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(  name = "product_colors",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id"))
    private Set<ColorEntity> colors = new HashSet<>();


    @OneToMany(
            mappedBy = "product",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ResponseEntity> responses=new ArrayList<>();

    @Column(name="availability",nullable = false)
    private boolean availability;

    public Product(LocalDateTime created, Category category, String title,String urlImage, Double price,
                   String description, Set<SizeEntity> sizes, Set<ColorEntity> colors,List<ResponseEntity> responses,
                   boolean availability) {
        this.created = created;
        this.category = category;
        this.title = title;
        this.urlImage = urlImage;
        this.price = price;
        this.description = description;
        this.sizes = sizes;
        this.colors = colors;
        this.responses = responses;
        this.availability = availability;
    }

    public Product(LocalDateTime created, Category category, String title, String urlImage, Double price, String description, boolean availability) {
        this.created = created;
        this.category = category;
        this.title = title;
        this.urlImage = urlImage;
        this.price = price;
        this.description = description;
        this.availability = availability;
    }

    public void addColor(ColorEntity color) {
        this.colors.add(color);
        color.getProducts().add(this);
    }

    public void removeColor(int colorId) {
        ColorEntity color = this.colors.stream().filter(c -> c.getId() == colorId).findFirst().orElse(null);
        if (color != null) {
            this.colors.remove(color);
            color.getProducts().remove(this);
        }
    }

    public void addSize(SizeEntity size) {
        this.sizes.add(size);
        size.getProducts().add(this);
    }

    public void removeSize(int sizeId) {
        SizeEntity size = this.sizes.stream().filter(c -> c.getId() == sizeId).findFirst().orElse(null);
        if (size != null) {
            this.sizes.remove(size);
            size.getProducts().remove(this);
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
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

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", created=" + created +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", urlImage='" + urlImage + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", sizes=" + sizes +
                ", colors=" + colors +
                ", responses=" + responses +
                ", availability=" + availability +
                '}';
    }
}
