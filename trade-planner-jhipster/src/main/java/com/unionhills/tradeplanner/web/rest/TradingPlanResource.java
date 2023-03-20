package com.unionhills.tradeplanner.web.rest;

import com.unionhills.tradeplanner.domain.TradingPlan;
import com.unionhills.tradeplanner.repository.TradingPlanRepository;
import com.unionhills.tradeplanner.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.unionhills.tradeplanner.domain.TradingPlan}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TradingPlanResource {

    private final Logger log = LoggerFactory.getLogger(TradingPlanResource.class);

    private static final String ENTITY_NAME = "tradingPlan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TradingPlanRepository tradingPlanRepository;

    public TradingPlanResource(TradingPlanRepository tradingPlanRepository) {
        this.tradingPlanRepository = tradingPlanRepository;
    }

    /**
     * {@code POST  /trading-plans} : Create a new tradingPlan.
     *
     * @param tradingPlan the tradingPlan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tradingPlan, or with status {@code 400 (Bad Request)} if the tradingPlan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trading-plans")
    public ResponseEntity<TradingPlan> createTradingPlan(@Valid @RequestBody TradingPlan tradingPlan) throws URISyntaxException {
        log.debug("REST request to save TradingPlan : {}", tradingPlan);
        if (tradingPlan.getId() != null) {
            throw new BadRequestAlertException("A new tradingPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TradingPlan result = tradingPlanRepository.save(tradingPlan);
        return ResponseEntity
            .created(new URI("/api/trading-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trading-plans/:id} : Updates an existing tradingPlan.
     *
     * @param id the id of the tradingPlan to save.
     * @param tradingPlan the tradingPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tradingPlan,
     * or with status {@code 400 (Bad Request)} if the tradingPlan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tradingPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trading-plans/{id}")
    public ResponseEntity<TradingPlan> updateTradingPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TradingPlan tradingPlan
    ) throws URISyntaxException {
        log.debug("REST request to update TradingPlan : {}, {}", id, tradingPlan);
        if (tradingPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tradingPlan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tradingPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TradingPlan result = tradingPlanRepository.save(tradingPlan);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tradingPlan.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /trading-plans/:id} : Partial updates given fields of an existing tradingPlan, field will ignore if it is null
     *
     * @param id the id of the tradingPlan to save.
     * @param tradingPlan the tradingPlan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tradingPlan,
     * or with status {@code 400 (Bad Request)} if the tradingPlan is not valid,
     * or with status {@code 404 (Not Found)} if the tradingPlan is not found,
     * or with status {@code 500 (Internal Server Error)} if the tradingPlan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/trading-plans/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TradingPlan> partialUpdateTradingPlan(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TradingPlan tradingPlan
    ) throws URISyntaxException {
        log.debug("REST request to partial update TradingPlan partially : {}, {}", id, tradingPlan);
        if (tradingPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tradingPlan.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tradingPlanRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TradingPlan> result = tradingPlanRepository
            .findById(tradingPlan.getId())
            .map(existingTradingPlan -> {
                if (tradingPlan.getName() != null) {
                    existingTradingPlan.setName(tradingPlan.getName());
                }
                if (tradingPlan.getUnderlying() != null) {
                    existingTradingPlan.setUnderlying(tradingPlan.getUnderlying());
                }
                if (tradingPlan.getUnderlyingDescription() != null) {
                    existingTradingPlan.setUnderlyingDescription(tradingPlan.getUnderlyingDescription());
                }
                if (tradingPlan.getUnderlyingOutlook() != null) {
                    existingTradingPlan.setUnderlyingOutlook(tradingPlan.getUnderlyingOutlook());
                }
                if (tradingPlan.getUnderlyingOutlookOtherDesc() != null) {
                    existingTradingPlan.setUnderlyingOutlookOtherDesc(tradingPlan.getUnderlyingOutlookOtherDesc());
                }
                if (tradingPlan.getUnderlyingTrend() != null) {
                    existingTradingPlan.setUnderlyingTrend(tradingPlan.getUnderlyingTrend());
                }
                if (tradingPlan.getMarketOutlook() != null) {
                    existingTradingPlan.setMarketOutlook(tradingPlan.getMarketOutlook());
                }
                if (tradingPlan.getMarketOutlookOtherDesc() != null) {
                    existingTradingPlan.setMarketOutlookOtherDesc(tradingPlan.getMarketOutlookOtherDesc());
                }
                if (tradingPlan.getMarketTrend() != null) {
                    existingTradingPlan.setMarketTrend(tradingPlan.getMarketTrend());
                }
                if (tradingPlan.getTimeFrame() != null) {
                    existingTradingPlan.setTimeFrame(tradingPlan.getTimeFrame());
                }
                if (tradingPlan.getStrategy() != null) {
                    existingTradingPlan.setStrategy(tradingPlan.getStrategy());
                }
                if (tradingPlan.getNotes() != null) {
                    existingTradingPlan.setNotes(tradingPlan.getNotes());
                }

                return existingTradingPlan;
            })
            .map(tradingPlanRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tradingPlan.getId().toString())
        );
    }

    /**
     * {@code GET  /trading-plans} : get all the tradingPlans.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tradingPlans in body.
     */
    @GetMapping("/trading-plans")
    public List<TradingPlan> getAllTradingPlans() {
        log.debug("REST request to get all TradingPlans");
        return tradingPlanRepository.findAll();
    }

    /**
     * {@code GET  /trading-plans/:id} : get the "id" tradingPlan.
     *
     * @param id the id of the tradingPlan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tradingPlan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trading-plans/{id}")
    public ResponseEntity<TradingPlan> getTradingPlan(@PathVariable Long id) {
        log.debug("REST request to get TradingPlan : {}", id);
        Optional<TradingPlan> tradingPlan = tradingPlanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tradingPlan);
    }

    /**
     * {@code DELETE  /trading-plans/:id} : delete the "id" tradingPlan.
     *
     * @param id the id of the tradingPlan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trading-plans/{id}")
    public ResponseEntity<Void> deleteTradingPlan(@PathVariable Long id) {
        log.debug("REST request to delete TradingPlan : {}", id);
        tradingPlanRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
