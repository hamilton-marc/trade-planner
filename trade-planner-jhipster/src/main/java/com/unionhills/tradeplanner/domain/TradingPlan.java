package com.unionhills.tradeplanner.domain;

import com.unionhills.tradeplanner.domain.enumeration.TrendOutlook;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TradingPlan.
 */
@Entity
@Table(name = "trading_plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TradingPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 1)
    @Column(name = "underlying", nullable = false)
    private String underlying;

    @Column(name = "underlying_description")
    private String underlyingDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "underlying_outlook")
    private TrendOutlook underlyingOutlook;

    @Column(name = "underlying_outlook_other_desc")
    private String underlyingOutlookOtherDesc;

    @Column(name = "underlying_trend")
    private String underlyingTrend;

    @Enumerated(EnumType.STRING)
    @Column(name = "market_outlook")
    private TrendOutlook marketOutlook;

    @Column(name = "market_outlook_other_desc")
    private String marketOutlookOtherDesc;

    @Column(name = "market_trend")
    private String marketTrend;

    @Column(name = "time_frame")
    private String timeFrame;

    @Column(name = "strategy")
    private String strategy;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TradingPlan id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public TradingPlan name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnderlying() {
        return this.underlying;
    }

    public TradingPlan underlying(String underlying) {
        this.setUnderlying(underlying);
        return this;
    }

    public void setUnderlying(String underlying) {
        this.underlying = underlying;
    }

    public String getUnderlyingDescription() {
        return this.underlyingDescription;
    }

    public TradingPlan underlyingDescription(String underlyingDescription) {
        this.setUnderlyingDescription(underlyingDescription);
        return this;
    }

    public void setUnderlyingDescription(String underlyingDescription) {
        this.underlyingDescription = underlyingDescription;
    }

    public TrendOutlook getUnderlyingOutlook() {
        return this.underlyingOutlook;
    }

    public TradingPlan underlyingOutlook(TrendOutlook underlyingOutlook) {
        this.setUnderlyingOutlook(underlyingOutlook);
        return this;
    }

    public void setUnderlyingOutlook(TrendOutlook underlyingOutlook) {
        this.underlyingOutlook = underlyingOutlook;
    }

    public String getUnderlyingOutlookOtherDesc() {
        return this.underlyingOutlookOtherDesc;
    }

    public TradingPlan underlyingOutlookOtherDesc(String underlyingOutlookOtherDesc) {
        this.setUnderlyingOutlookOtherDesc(underlyingOutlookOtherDesc);
        return this;
    }

    public void setUnderlyingOutlookOtherDesc(String underlyingOutlookOtherDesc) {
        this.underlyingOutlookOtherDesc = underlyingOutlookOtherDesc;
    }

    public String getUnderlyingTrend() {
        return this.underlyingTrend;
    }

    public TradingPlan underlyingTrend(String underlyingTrend) {
        this.setUnderlyingTrend(underlyingTrend);
        return this;
    }

    public void setUnderlyingTrend(String underlyingTrend) {
        this.underlyingTrend = underlyingTrend;
    }

    public TrendOutlook getMarketOutlook() {
        return this.marketOutlook;
    }

    public TradingPlan marketOutlook(TrendOutlook marketOutlook) {
        this.setMarketOutlook(marketOutlook);
        return this;
    }

    public void setMarketOutlook(TrendOutlook marketOutlook) {
        this.marketOutlook = marketOutlook;
    }

    public String getMarketOutlookOtherDesc() {
        return this.marketOutlookOtherDesc;
    }

    public TradingPlan marketOutlookOtherDesc(String marketOutlookOtherDesc) {
        this.setMarketOutlookOtherDesc(marketOutlookOtherDesc);
        return this;
    }

    public void setMarketOutlookOtherDesc(String marketOutlookOtherDesc) {
        this.marketOutlookOtherDesc = marketOutlookOtherDesc;
    }

    public String getMarketTrend() {
        return this.marketTrend;
    }

    public TradingPlan marketTrend(String marketTrend) {
        this.setMarketTrend(marketTrend);
        return this;
    }

    public void setMarketTrend(String marketTrend) {
        this.marketTrend = marketTrend;
    }

    public String getTimeFrame() {
        return this.timeFrame;
    }

    public TradingPlan timeFrame(String timeFrame) {
        this.setTimeFrame(timeFrame);
        return this;
    }

    public void setTimeFrame(String timeFrame) {
        this.timeFrame = timeFrame;
    }

    public String getStrategy() {
        return this.strategy;
    }

    public TradingPlan strategy(String strategy) {
        this.setStrategy(strategy);
        return this;
    }

    public void setStrategy(String strategy) {
        this.strategy = strategy;
    }

    public String getNotes() {
        return this.notes;
    }

    public TradingPlan notes(String notes) {
        this.setNotes(notes);
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TradingPlan user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TradingPlan)) {
            return false;
        }
        return id != null && id.equals(((TradingPlan) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TradingPlan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", underlying='" + getUnderlying() + "'" +
            ", underlyingDescription='" + getUnderlyingDescription() + "'" +
            ", underlyingOutlook='" + getUnderlyingOutlook() + "'" +
            ", underlyingOutlookOtherDesc='" + getUnderlyingOutlookOtherDesc() + "'" +
            ", underlyingTrend='" + getUnderlyingTrend() + "'" +
            ", marketOutlook='" + getMarketOutlook() + "'" +
            ", marketOutlookOtherDesc='" + getMarketOutlookOtherDesc() + "'" +
            ", marketTrend='" + getMarketTrend() + "'" +
            ", timeFrame='" + getTimeFrame() + "'" +
            ", strategy='" + getStrategy() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
