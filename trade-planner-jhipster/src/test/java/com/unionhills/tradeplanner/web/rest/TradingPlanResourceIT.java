package com.unionhills.tradeplanner.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.unionhills.tradeplanner.IntegrationTest;
import com.unionhills.tradeplanner.domain.TradingPlan;
import com.unionhills.tradeplanner.domain.enumeration.TrendOutlook;
import com.unionhills.tradeplanner.domain.enumeration.TrendOutlook;
import com.unionhills.tradeplanner.repository.TradingPlanRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TradingPlanResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TradingPlanResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_UNDERLYING = "AAAAAAAAAA";
    private static final String UPDATED_UNDERLYING = "BBBBBBBBBB";

    private static final String DEFAULT_UNDERLYING_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_UNDERLYING_DESCRIPTION = "BBBBBBBBBB";

    private static final TrendOutlook DEFAULT_UNDERLYING_OUTLOOK = TrendOutlook.Unclear;
    private static final TrendOutlook UPDATED_UNDERLYING_OUTLOOK = TrendOutlook.Up;

    private static final String DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC = "AAAAAAAAAA";
    private static final String UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_UNDERLYING_TREND = "AAAAAAAAAA";
    private static final String UPDATED_UNDERLYING_TREND = "BBBBBBBBBB";

    private static final TrendOutlook DEFAULT_MARKET_OUTLOOK = TrendOutlook.Unclear;
    private static final TrendOutlook UPDATED_MARKET_OUTLOOK = TrendOutlook.Up;

    private static final String DEFAULT_MARKET_OUTLOOK_OTHER_DESC = "AAAAAAAAAA";
    private static final String UPDATED_MARKET_OUTLOOK_OTHER_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_MARKET_TREND = "AAAAAAAAAA";
    private static final String UPDATED_MARKET_TREND = "BBBBBBBBBB";

    private static final String DEFAULT_TIME_FRAME = "AAAAAAAAAA";
    private static final String UPDATED_TIME_FRAME = "BBBBBBBBBB";

    private static final String DEFAULT_STRATEGY = "AAAAAAAAAA";
    private static final String UPDATED_STRATEGY = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/trading-plans";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TradingPlanRepository tradingPlanRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTradingPlanMockMvc;

    private TradingPlan tradingPlan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TradingPlan createEntity(EntityManager em) {
        TradingPlan tradingPlan = new TradingPlan()
            .name(DEFAULT_NAME)
            .underlying(DEFAULT_UNDERLYING)
            .underlyingDescription(DEFAULT_UNDERLYING_DESCRIPTION)
            .underlyingOutlook(DEFAULT_UNDERLYING_OUTLOOK)
            .underlyingOutlookOtherDesc(DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC)
            .underlyingTrend(DEFAULT_UNDERLYING_TREND)
            .marketOutlook(DEFAULT_MARKET_OUTLOOK)
            .marketOutlookOtherDesc(DEFAULT_MARKET_OUTLOOK_OTHER_DESC)
            .marketTrend(DEFAULT_MARKET_TREND)
            .timeFrame(DEFAULT_TIME_FRAME)
            .strategy(DEFAULT_STRATEGY)
            .notes(DEFAULT_NOTES);
        return tradingPlan;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TradingPlan createUpdatedEntity(EntityManager em) {
        TradingPlan tradingPlan = new TradingPlan()
            .name(UPDATED_NAME)
            .underlying(UPDATED_UNDERLYING)
            .underlyingDescription(UPDATED_UNDERLYING_DESCRIPTION)
            .underlyingOutlook(UPDATED_UNDERLYING_OUTLOOK)
            .underlyingOutlookOtherDesc(UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC)
            .underlyingTrend(UPDATED_UNDERLYING_TREND)
            .marketOutlook(UPDATED_MARKET_OUTLOOK)
            .marketOutlookOtherDesc(UPDATED_MARKET_OUTLOOK_OTHER_DESC)
            .marketTrend(UPDATED_MARKET_TREND)
            .timeFrame(UPDATED_TIME_FRAME)
            .strategy(UPDATED_STRATEGY)
            .notes(UPDATED_NOTES);
        return tradingPlan;
    }

    @BeforeEach
    public void initTest() {
        tradingPlan = createEntity(em);
    }

    @Test
    @Transactional
    void createTradingPlan() throws Exception {
        int databaseSizeBeforeCreate = tradingPlanRepository.findAll().size();
        // Create the TradingPlan
        restTradingPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tradingPlan)))
            .andExpect(status().isCreated());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeCreate + 1);
        TradingPlan testTradingPlan = tradingPlanList.get(tradingPlanList.size() - 1);
        assertThat(testTradingPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTradingPlan.getUnderlying()).isEqualTo(DEFAULT_UNDERLYING);
        assertThat(testTradingPlan.getUnderlyingDescription()).isEqualTo(DEFAULT_UNDERLYING_DESCRIPTION);
        assertThat(testTradingPlan.getUnderlyingOutlook()).isEqualTo(DEFAULT_UNDERLYING_OUTLOOK);
        assertThat(testTradingPlan.getUnderlyingOutlookOtherDesc()).isEqualTo(DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getUnderlyingTrend()).isEqualTo(DEFAULT_UNDERLYING_TREND);
        assertThat(testTradingPlan.getMarketOutlook()).isEqualTo(DEFAULT_MARKET_OUTLOOK);
        assertThat(testTradingPlan.getMarketOutlookOtherDesc()).isEqualTo(DEFAULT_MARKET_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getMarketTrend()).isEqualTo(DEFAULT_MARKET_TREND);
        assertThat(testTradingPlan.getTimeFrame()).isEqualTo(DEFAULT_TIME_FRAME);
        assertThat(testTradingPlan.getStrategy()).isEqualTo(DEFAULT_STRATEGY);
        assertThat(testTradingPlan.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    void createTradingPlanWithExistingId() throws Exception {
        // Create the TradingPlan with an existing ID
        tradingPlan.setId(1L);

        int databaseSizeBeforeCreate = tradingPlanRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTradingPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tradingPlan)))
            .andExpect(status().isBadRequest());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradingPlanRepository.findAll().size();
        // set the field null
        tradingPlan.setName(null);

        // Create the TradingPlan, which fails.

        restTradingPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tradingPlan)))
            .andExpect(status().isBadRequest());

        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUnderlyingIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradingPlanRepository.findAll().size();
        // set the field null
        tradingPlan.setUnderlying(null);

        // Create the TradingPlan, which fails.

        restTradingPlanMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tradingPlan)))
            .andExpect(status().isBadRequest());

        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTradingPlans() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        // Get all the tradingPlanList
        restTradingPlanMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tradingPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].underlying").value(hasItem(DEFAULT_UNDERLYING)))
            .andExpect(jsonPath("$.[*].underlyingDescription").value(hasItem(DEFAULT_UNDERLYING_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].underlyingOutlook").value(hasItem(DEFAULT_UNDERLYING_OUTLOOK.toString())))
            .andExpect(jsonPath("$.[*].underlyingOutlookOtherDesc").value(hasItem(DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC)))
            .andExpect(jsonPath("$.[*].underlyingTrend").value(hasItem(DEFAULT_UNDERLYING_TREND)))
            .andExpect(jsonPath("$.[*].marketOutlook").value(hasItem(DEFAULT_MARKET_OUTLOOK.toString())))
            .andExpect(jsonPath("$.[*].marketOutlookOtherDesc").value(hasItem(DEFAULT_MARKET_OUTLOOK_OTHER_DESC)))
            .andExpect(jsonPath("$.[*].marketTrend").value(hasItem(DEFAULT_MARKET_TREND)))
            .andExpect(jsonPath("$.[*].timeFrame").value(hasItem(DEFAULT_TIME_FRAME)))
            .andExpect(jsonPath("$.[*].strategy").value(hasItem(DEFAULT_STRATEGY)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }

    @Test
    @Transactional
    void getTradingPlan() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        // Get the tradingPlan
        restTradingPlanMockMvc
            .perform(get(ENTITY_API_URL_ID, tradingPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tradingPlan.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.underlying").value(DEFAULT_UNDERLYING))
            .andExpect(jsonPath("$.underlyingDescription").value(DEFAULT_UNDERLYING_DESCRIPTION))
            .andExpect(jsonPath("$.underlyingOutlook").value(DEFAULT_UNDERLYING_OUTLOOK.toString()))
            .andExpect(jsonPath("$.underlyingOutlookOtherDesc").value(DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC))
            .andExpect(jsonPath("$.underlyingTrend").value(DEFAULT_UNDERLYING_TREND))
            .andExpect(jsonPath("$.marketOutlook").value(DEFAULT_MARKET_OUTLOOK.toString()))
            .andExpect(jsonPath("$.marketOutlookOtherDesc").value(DEFAULT_MARKET_OUTLOOK_OTHER_DESC))
            .andExpect(jsonPath("$.marketTrend").value(DEFAULT_MARKET_TREND))
            .andExpect(jsonPath("$.timeFrame").value(DEFAULT_TIME_FRAME))
            .andExpect(jsonPath("$.strategy").value(DEFAULT_STRATEGY))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    @Transactional
    void getNonExistingTradingPlan() throws Exception {
        // Get the tradingPlan
        restTradingPlanMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTradingPlan() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();

        // Update the tradingPlan
        TradingPlan updatedTradingPlan = tradingPlanRepository.findById(tradingPlan.getId()).get();
        // Disconnect from session so that the updates on updatedTradingPlan are not directly saved in db
        em.detach(updatedTradingPlan);
        updatedTradingPlan
            .name(UPDATED_NAME)
            .underlying(UPDATED_UNDERLYING)
            .underlyingDescription(UPDATED_UNDERLYING_DESCRIPTION)
            .underlyingOutlook(UPDATED_UNDERLYING_OUTLOOK)
            .underlyingOutlookOtherDesc(UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC)
            .underlyingTrend(UPDATED_UNDERLYING_TREND)
            .marketOutlook(UPDATED_MARKET_OUTLOOK)
            .marketOutlookOtherDesc(UPDATED_MARKET_OUTLOOK_OTHER_DESC)
            .marketTrend(UPDATED_MARKET_TREND)
            .timeFrame(UPDATED_TIME_FRAME)
            .strategy(UPDATED_STRATEGY)
            .notes(UPDATED_NOTES);

        restTradingPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTradingPlan.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTradingPlan))
            )
            .andExpect(status().isOk());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
        TradingPlan testTradingPlan = tradingPlanList.get(tradingPlanList.size() - 1);
        assertThat(testTradingPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTradingPlan.getUnderlying()).isEqualTo(UPDATED_UNDERLYING);
        assertThat(testTradingPlan.getUnderlyingDescription()).isEqualTo(UPDATED_UNDERLYING_DESCRIPTION);
        assertThat(testTradingPlan.getUnderlyingOutlook()).isEqualTo(UPDATED_UNDERLYING_OUTLOOK);
        assertThat(testTradingPlan.getUnderlyingOutlookOtherDesc()).isEqualTo(UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getUnderlyingTrend()).isEqualTo(UPDATED_UNDERLYING_TREND);
        assertThat(testTradingPlan.getMarketOutlook()).isEqualTo(UPDATED_MARKET_OUTLOOK);
        assertThat(testTradingPlan.getMarketOutlookOtherDesc()).isEqualTo(UPDATED_MARKET_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getMarketTrend()).isEqualTo(UPDATED_MARKET_TREND);
        assertThat(testTradingPlan.getTimeFrame()).isEqualTo(UPDATED_TIME_FRAME);
        assertThat(testTradingPlan.getStrategy()).isEqualTo(UPDATED_STRATEGY);
        assertThat(testTradingPlan.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    void putNonExistingTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tradingPlan.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tradingPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tradingPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tradingPlan)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTradingPlanWithPatch() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();

        // Update the tradingPlan using partial update
        TradingPlan partialUpdatedTradingPlan = new TradingPlan();
        partialUpdatedTradingPlan.setId(tradingPlan.getId());

        partialUpdatedTradingPlan
            .underlying(UPDATED_UNDERLYING)
            .underlyingDescription(UPDATED_UNDERLYING_DESCRIPTION)
            .underlyingOutlook(UPDATED_UNDERLYING_OUTLOOK)
            .marketOutlookOtherDesc(UPDATED_MARKET_OUTLOOK_OTHER_DESC)
            .notes(UPDATED_NOTES);

        restTradingPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTradingPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTradingPlan))
            )
            .andExpect(status().isOk());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
        TradingPlan testTradingPlan = tradingPlanList.get(tradingPlanList.size() - 1);
        assertThat(testTradingPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTradingPlan.getUnderlying()).isEqualTo(UPDATED_UNDERLYING);
        assertThat(testTradingPlan.getUnderlyingDescription()).isEqualTo(UPDATED_UNDERLYING_DESCRIPTION);
        assertThat(testTradingPlan.getUnderlyingOutlook()).isEqualTo(UPDATED_UNDERLYING_OUTLOOK);
        assertThat(testTradingPlan.getUnderlyingOutlookOtherDesc()).isEqualTo(DEFAULT_UNDERLYING_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getUnderlyingTrend()).isEqualTo(DEFAULT_UNDERLYING_TREND);
        assertThat(testTradingPlan.getMarketOutlook()).isEqualTo(DEFAULT_MARKET_OUTLOOK);
        assertThat(testTradingPlan.getMarketOutlookOtherDesc()).isEqualTo(UPDATED_MARKET_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getMarketTrend()).isEqualTo(DEFAULT_MARKET_TREND);
        assertThat(testTradingPlan.getTimeFrame()).isEqualTo(DEFAULT_TIME_FRAME);
        assertThat(testTradingPlan.getStrategy()).isEqualTo(DEFAULT_STRATEGY);
        assertThat(testTradingPlan.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    void fullUpdateTradingPlanWithPatch() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();

        // Update the tradingPlan using partial update
        TradingPlan partialUpdatedTradingPlan = new TradingPlan();
        partialUpdatedTradingPlan.setId(tradingPlan.getId());

        partialUpdatedTradingPlan
            .name(UPDATED_NAME)
            .underlying(UPDATED_UNDERLYING)
            .underlyingDescription(UPDATED_UNDERLYING_DESCRIPTION)
            .underlyingOutlook(UPDATED_UNDERLYING_OUTLOOK)
            .underlyingOutlookOtherDesc(UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC)
            .underlyingTrend(UPDATED_UNDERLYING_TREND)
            .marketOutlook(UPDATED_MARKET_OUTLOOK)
            .marketOutlookOtherDesc(UPDATED_MARKET_OUTLOOK_OTHER_DESC)
            .marketTrend(UPDATED_MARKET_TREND)
            .timeFrame(UPDATED_TIME_FRAME)
            .strategy(UPDATED_STRATEGY)
            .notes(UPDATED_NOTES);

        restTradingPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTradingPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTradingPlan))
            )
            .andExpect(status().isOk());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
        TradingPlan testTradingPlan = tradingPlanList.get(tradingPlanList.size() - 1);
        assertThat(testTradingPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTradingPlan.getUnderlying()).isEqualTo(UPDATED_UNDERLYING);
        assertThat(testTradingPlan.getUnderlyingDescription()).isEqualTo(UPDATED_UNDERLYING_DESCRIPTION);
        assertThat(testTradingPlan.getUnderlyingOutlook()).isEqualTo(UPDATED_UNDERLYING_OUTLOOK);
        assertThat(testTradingPlan.getUnderlyingOutlookOtherDesc()).isEqualTo(UPDATED_UNDERLYING_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getUnderlyingTrend()).isEqualTo(UPDATED_UNDERLYING_TREND);
        assertThat(testTradingPlan.getMarketOutlook()).isEqualTo(UPDATED_MARKET_OUTLOOK);
        assertThat(testTradingPlan.getMarketOutlookOtherDesc()).isEqualTo(UPDATED_MARKET_OUTLOOK_OTHER_DESC);
        assertThat(testTradingPlan.getMarketTrend()).isEqualTo(UPDATED_MARKET_TREND);
        assertThat(testTradingPlan.getTimeFrame()).isEqualTo(UPDATED_TIME_FRAME);
        assertThat(testTradingPlan.getStrategy()).isEqualTo(UPDATED_STRATEGY);
        assertThat(testTradingPlan.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    void patchNonExistingTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tradingPlan.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tradingPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tradingPlan))
            )
            .andExpect(status().isBadRequest());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTradingPlan() throws Exception {
        int databaseSizeBeforeUpdate = tradingPlanRepository.findAll().size();
        tradingPlan.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTradingPlanMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tradingPlan))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TradingPlan in the database
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTradingPlan() throws Exception {
        // Initialize the database
        tradingPlanRepository.saveAndFlush(tradingPlan);

        int databaseSizeBeforeDelete = tradingPlanRepository.findAll().size();

        // Delete the tradingPlan
        restTradingPlanMockMvc
            .perform(delete(ENTITY_API_URL_ID, tradingPlan.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TradingPlan> tradingPlanList = tradingPlanRepository.findAll();
        assertThat(tradingPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
