import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { PoubelleService } from "../poubelle.service";
import { Poubelle } from "../poubelle/poubelle";

import { Alerte } from "../alerte/alerte";
import { AlerteService } from "../alerte.service";
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    poubelles: Poubelle[];
    poubelle1: any;
    alertes: Alerte[];
    poubellesRemplies: number;
    nbAlertes: number;
    tauxJ: number;
    tauxV: number;
    tauxG: number;
    augNbAlertes: number;
    nbChecked: number;
    websiteViewsChart;

    constructor(private poubelleService: PoubelleService, private alerteService: AlerteService) { }


    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };
    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };


    ngOnInit() {
        this.getPoubellesRemplies();
        this.getNbAlertes();
    }


    getPoubellesRemplies(): void {
        this.poubelleService.getPoubelles().subscribe(poubelles => {
            var n = 0, nJ = 0, nV = 0, nG = 0;
            var sJ = 0, sV = 0, sG = 0;
            this.poubelle1 = poubelles[0];
            for (let poubelle of poubelles) {
                if (poubelle.category == 1) {
                    nJ = nJ + 1;
                    sJ = sJ + poubelle.fillingLevel;
                }
                else if (poubelle.category == 2) {
                    nV = nV + 1;
                    sV = sV + poubelle.fillingLevel;
                }
                else if (poubelle.category == 3) {
                    nG = nG + 1;
                    sG = sG + poubelle.fillingLevel;
                }
                if (poubelle.fillingLevel > 74) {
                    n = n + 1;
                }
            }
            this.poubellesRemplies = Math.round(n / poubelles.length * 10000) / 100;
            this.tauxJ = Math.round(sJ / nJ);
            this.tauxV = Math.round(sV / nV);
            this.tauxG = Math.round(sG / nG);
            var dailySalesChart = new Chartist.Bar('#dailySalesChart', {
                labels: ['Jaune', 'Verte', 'Grise'],
                series: [
                    [this.tauxJ, this.tauxV, this.tauxG]
                ]
            }, {
                    seriesBarDistance: 5,
                    reverseData: true,
                    horizontalBars: true,
                    axisY: {
                        offset: 35
                    },
                });
            this.startAnimationForBarChart(dailySalesChart);

        });
    }

    getNbAlertes(): void {
        this.alerteService.getAlertes().subscribe(alertes => {
            var date = Array(8);
            date[7] = new Date();
            var nbC = 0;
            var nbPleines = 0;
            var nbOdorantes = 0;
            var nbCassees = 0;
            for (var i = 6; i >= 0; i--) {
                date[i] = new Date(date[i + 1].getTime() - (24 * 60 * 60 * 1000));
            }
            var nb = [0, 0, 0, 0, 0, 0, 0];
            for (let alerte of alertes) {
                for (var i = 0; i < 7; i++) {
                    if (date[i].getTime() < alerte.created && alerte.created < date[i + 1].getTime()) {
                        nb[i] = nb[i] + 1;
                    }
                }
                if (alerte.checked) {
                    nbC = nbC + 1;
                }
                if (alerte.alertType == 1) {
                    nbPleines = nbPleines + 1;
                }
                if (alerte.alertType == 2) {
                    nbOdorantes = nbOdorantes + 1;
                }
                if (alerte.alertType == 3) {
                    nbCassees = nbCassees + 1;
                }

            }
            var nbAlertesTotales = alertes.length;
            this.nbChecked = nbC;
            this.nbAlertes = nb[6];

            nbPleines = nbPleines / nbAlertesTotales * 100;
            nbOdorantes = nbOdorantes / nbAlertesTotales * 100;
            nbCassees = nbCassees / nbAlertesTotales * 100;

            this.augNbAlertes = nb[6] - nb[5];

            const dataCompletedTasksChart: any = {
                labels: ['-7d', '-6d', '-5d', '-4d', '-3d', '-2d', '-1d'],
                series: [nb]
            };

            const optionsCompletedTasksChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: Math.max(nb[0], nb[1], nb[2], nb[3], nb[4], nb[5], nb[6]) + 1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
            }

            var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

            this.startAnimationForLineChart(completedTasksChart);


            var data = {
                labels: ['Pleines', 'Odorantes', 'Cassées'],
                series: [nbPleines, nbOdorantes, nbCassees],
            };

            this.websiteViewsChart = new Chartist.Pie('#websiteViewsChart', data);


        });
    }

}
