package program.entities;

import javax.persistence.*;

@Entity
@Table(name="tbl_responses")
public class ResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="comment",columnDefinition="text", nullable = false)
    private String comment;

    @ManyToOne()
    @JoinColumn(name="product_id", nullable = false)
    private Product product;

    @ManyToOne()
    @JoinColumn(name="user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private int rating;

    public ResponseEntity() {
    }

    public ResponseEntity(String comment, Product product, UserEntity user, int rating) {
        this.comment = comment;
        this.product = product;
        this.user = user;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
